const persons = [
  {
    name: "Ola Olu",
    age: 23,
    height: 56,
    gender: "Male",
    city: "Ogbomoso",
    id: 1,
  },
  {
    name: "Oyin Kola",
    age: 23,
    height: 56,
    gender: "Male",
    city: "Oyo",
    id: 2,
  },
  {
    name: "Bukky Sola",
    age: 23,
    height: 56,
    gender: "Female",
    city: "Lagos",
    id: 3,
  },
  {
    name: "Vero Lizzy",
    age: 23,
    height: 56,
    gender: "Female",
    city: "Ibandan",
    id: 4,
  },
];

module.exports = {
  read(after = 0, limit = undefined) {
    const index = persons.findIndex((p) => p.id === after);

    const start = index + 1;

    let end = persons.length;

    if (Number.isInteger(limit)) {
      end = start + limit;
    }

    return persons.slice(start, end);
  },

  create(partialPersonData) {
    partialPersonData.id = persons.length + 1;
    persons.push(partialPersonData);
    return partialPersonData;
  },

  update(id, updateData) {
    id = parseInt(id);

    const person = persons.find((p) => p.id === id);
    if (person) {
      for (let key of ["name", "age", "height", "city", "gender"]) {
        if (updateData[key]) {
          person[key] = updateData[key];
        }
      }
      return person;
    }
    return null;
  },

  delete(id) {
    //const person = persons.find((p) => p.id === id);
    let findPerson = null;
    let index = 0;
    for (; index < persons.length; index++) {
      findPerson = persons[index];

      if (findPerson.id === id) {
        break;
      }
    }

    if (findPerson) {
      persons.splice(index, 1);
    }

    return findPerson;
  },
};
