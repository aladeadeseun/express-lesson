const db = require("../db");

module.exports = {
  getPerson(_req, res) {
    return res.status(200).json({ success: true, data: db.read() });
  },
  postPerson(req, res) {
    const body = req.body;
    const newPerson = db.create({
      name: body.name,
      age: body.age,
      height: body.height,
      gender: body.gender,
      city: body.city,
    });

    //return ;
    res.status(201).send({
      success: true,
      msg: "Person created successfully",
      data: newPerson,
    });
  },
  patchPerson(req, res) {
    try {
      console.log(req.params);
      const update = db.update(req.params.person_id, req.body);

      if (!update) {
        res.status(404).json({ success: false, msg: "Person not found." });
      }
      return res
        .status(200)
        .json({ success: true, msg: "Update successful", data: update });
    } catch (e) {
      throw e;
    }
  },
};
