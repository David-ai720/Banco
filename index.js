const express = require("express");
const app = express();

app.use(express.json());

const Bancos = [
    {
    id: 1,
    nombre: "Banreservas",
    personas: [
        { id: 1, nombre: "Ramon", cuenta: "0589" },
        { id: 2, nombre: "Francisco", cuenta: "0459"},
        { id: 3, nombre: "Luis", cuenta: "0249"},
        { id: 4, nombre: "Miguel", cuenta: "0629" },
        { id: 5, nombre: "Yeri", cuenta: "0428"},
        { id: 6, nombre: "Angel", cuenta: "0225"},

    ]},

    {

    id: 2,
    nombre: "Banco Popular",
    personas: [
        { id: 1, nombre: "Ramon", cuenta: "0589" },
        { id: 2, nombre: "Francisco", cuenta: "0459"},
        { id: 3, nombre: "Luis", cuenta: "0249"},
        { id: 4, nombre: "Miguel", cuenta: "0629" },
        { id: 5, nombre: "Yeri", cuenta: "0428"},
        { id: 6, nombre: "Angel", cuenta: "0225"},

    ]},

    {

    id: 3,
    nombre: "Banco Santa Cruz",
    personas: [
        { id: 1, nombre: "Ramon", cuenta: "0589" },
        { id: 2, nombre: "Francisco", cuenta: "0459"},
        { id: 3, nombre: "Luis", cuenta: "0249"},
        { id: 4, nombre: "Miguel", cuenta: "0629" },
        { id: 5, nombre: "Yeri", cuenta: "0428"},
        { id: 6, nombre: "Angel", cuenta: "0225"},

    ]},
    
];

app.get("/", (req, res) => {
    res.send("Bienvenido al Apartado de Bancos");
});

app.get("/Bancos", (req, res) => {
    res.json(Bancos);
});

app.get("/Bancos/:id", (req, res) => {
    const Banco = Bancos.find(b => b.id == req.params.id);

    if (!Banco) {
        return res.status(404).send("Banco no encontrado");
    }

    res.json(Banco);
});

app.get("/Bancos/:id/personas", (req, res) => {
    const Banco = Bancos.find(b => b.id == req.params.id);

    if (!Banco) {
        return res.status(404).send("Banco no encontrado");
    }

    res.json(Banco.personas);
});

app.get("/Bancos/:id/personas/:personaid", (req, res) => {
    const Banco = Bancos.find(b => b.id == req.params.id);

    if (!Banco) {
        return res.status(404).send("Banco no encontrado");
    }

    const persona = Banco.personas.find(p => p.id == req.params.personaid);

    if (!persona) {
        return res.status(404).send("Persona no encontrada")
    }

    res.json(persona);
});

app.post("/Bancos", (req, res) => {

    const BancoNuevo = {
        id: Bancos.length + 1,
        nombre: req.body.nombre,
        personas: []
    };

    Bancos.push(BancoNuevo);

    res.json(BancoNuevo);
});

app.post("/Bancos/:id/personas", (req, res) => {
    
    const Banco = Bancos.find(b => b.id == req.params.id);

    if (!Banco) {
        return res.status(404).send("Banco no encontrado");
    }

    const PersonaNueva = {
        id: Banco.personas.length + 1,
        nombre: req.body.nombre,
        cuenta: req.body.cuenta
    };

    Banco.personas.push(PersonaNueva);

    res.json(PersonaNueva);

});

app.put("/Bancos/:id/personas", (req, res) => {
    
    const Banco = Bancos.find(b => b.id == req.params.id);

    if (!Banco) {
        return res.status(404).send("Banco no encontrado");
    }

    const persona = Banco.personas.find(p => p.id == req.params.personaid);

    if (!persona) {
        return res.status(404).send("Persona no encontrada");
    }

    persona.nombre = req.body.nombre;
    persona.cuenta = req.body.cuenta;

    res.json(persona);

});

app.delete('/Bancos/:id/personas/:personaid', async (req, res) => {
  try {
    const { id, personaId } = req.params;
    

    const resultado = await Persona.deleteOne({ _id: personaid, id: id });

    if (resultado.deletedCount === 0) {
      return res.status(404).json({ mensaje: 'Persona o banco no encontrado' });
    }

    res.json({ mensaje: 'Persona eliminada exitosamente del banco' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(3000, () =>{
    console.log("Servidor en marcha em http://localhost:3000");

})

