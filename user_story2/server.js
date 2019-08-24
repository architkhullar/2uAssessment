require('dotenv').config();
const path = require('path');
const _ = require('lodash');

// Initialize express
const express = require('express');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Initialize Socket.io
const http = require('http').Server(app)
const io = require('socket.io')(http);

// Initialize MongoDB
const mongoose = require('mongoose');
const Invoice = require('./models/invoice');

// Mongo db connection
console.log(process.env.MONGODB_URL);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true
}, err => {
  if(err) {
    console.log(`Error connecting to the database ${err}`);
    process.exit(1);
  }
});


// change stream for realtime updation when a new record is entered
var connection = mongoose.connection;

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true
}).then(db => {
  const changeStream = connection.db.collection("invoices").watch([{$match:{"operationType":"insert"}}]);
  changeStream.on("change", next => {
  if(next.fullDocument.status == "pending" ){
   var newInvoice = Invoice(next.fullDocument);
   io.emit('list', {
     [newInvoice._id]: newInvoice
   });
  }
 });
});

io.on('connection', async function (socket) {

  // Send initial data
  Invoice.find({status:{ $ne: "approve" }}, (error, result) => {
    const invoices = {};
    result.forEach(invoice => {
      invoices[invoice._id] = invoice;
    });
    socket.emit('list', invoices);
  });
  /**
   * Websocket implemented to
   * create a invoice object
   * update db with new invoice
   * send back updated list
   */
  socket.on('create', (data, callback) => {
    //set children to empty
    Invoice.create(data, (err, invoice) => {
      if (err) {
        console.log(`Error creating invoice - ${err}`);
        callback('error');
        return;
      }
      io.emit('list', {
        [invoice._id]: invoice
      });
      callback('done');
    });
  });

  /**
   * Websocket implemented to
   * update invoice.status  as "approve" of a invoice object
   * update db with new changes
   * send back updated list with only denied and pending status
   * invoices with approved are removed from state
   */
  socket.on('update', (data, callback) => {
    Invoice.findById(data._id, (err, invoice) => {
      if (err) {
        console.log(`Error finding invoice with id ${data._id} - ${err}`);
        callback('error');
        return;
      }

      invoice.status="approve";
      invoice.save().then((result, err) => {
        if (err) {
          console.log(`Error saving invoice with id ${invoice._id} - ${err}`);
          callback('error');
          return;
        }
        io.emit('delete',
          [invoice._id]
        );
        callback('done');
      });
    });
  });

  /**
   * Websocket implemented to
   * update invoice.status  as "deny" of a invoice object
   * update db with new children
   * send back updated list
   */
  socket.on('deny', (id, callback) => {
    Invoice.findById(id, (err, invoice) => {
      if (err) {
        console.log(`Error finding invoice with id ${id} - ${err}`);
        callback('error');
        return;
      }

      invoice.status="deny";
      invoice.save().then(() => {
        io.emit('list', {
          [invoice._id]: invoice
        });
        callback('done');
      });
    });
  });
});

// Start the app
http.listen(process.env.SOCKET_PORT, function () {
  console.log(`Server listening on port ${process.env.SOCKET_PORT}`);
});
