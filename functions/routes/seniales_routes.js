const { Router } = require("express");
const router = Router();

const admin = require("firebase-admin");
const db = admin.firestore();

module.exports = router


router.post('/api/seniales', async (req, res) => {
    try {
        let newSenial;
        if (!req.body.id) {
            newSenial = {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                imagen: req.body.imagen,
                tipo_senial: req.body.tipo_senial,
                id_clase: req.body.id_clase
            };
        } else {
            newSenial = {
                id: req.body.id,
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                imagen: req.body.imagen,
                tipo_senial: req.body.tipo_senial,
                id_clase: req.body.id_clase
            };
        }

        const docRef = await db.collection("seniales").add(newSenial);
        return res.status(201).json({ message: "Señal agregada correctamente", id: docRef.id });
    } catch (error) {
        console.error("Error al agregar la señal:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.get('/api/seniales', async (req, res) => {
    try {
        const senialesSnapshot = await db.collection("seniales").get();
        const seniales = [];

        senialesSnapshot.forEach((doc) => {
            seniales.push({
                id: doc.id,
                ...doc.data(),
            });
        });

        return res.status(200).json(seniales);
    } catch (error) {
        console.error("Error al obtener las señales:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.delete('/api/seniales/id/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await db.collection("seniales").doc(id).delete();
        return res.status(200).json({ message: "Señal eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar la señal:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});
router.get('/api/seniales/id/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const docSnapshot = await db.collection("seniales").doc(id).get();

        if (docSnapshot.exists) {
            const senial = docSnapshot.data();
            return res.status(200).json(senial);
        } else {
            return res.status(404).json({ message: "Señal no encontrada" });
        }
    } catch (error) {
        console.error("Error al obtener señal por id:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});
