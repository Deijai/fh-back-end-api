const { request ,response } = require("express");
const Client = require("../models/Client");

const getClients = async (req = request, res = response) => {
  try {
    const clients = await Client.find();
    return res.json({ ok: true, hasNext: false, items: clients, po_sync_date: "2018-10-08T13:57:55.008Z" });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error,
    });
  }
};

const createClient = async (req = request, res = response) => {
    const client = req.body;
  
    try {
      const newClient = new Client(client);
  
      //salvar user
      await newClient.save();
  
      return res.json({ hasNext: false,client: newClient, po_sync_date: "2018-10-08T13:57:55.008Z" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        message: error,
      });
    }
  };

  const deleteClient = async (req = request, res = response) => {
    console.log(req)
   
  };
  

  module.exports = {
    getClients,
    createClient,
    deleteClient
  };
  
