const express = require("express");
const members = require("../../Members");
const uuid = require("uuid");
const router = express.Router();

// Gets All Members
router.get("/", (request, response) => {
  response.json(members);
});

// Get Single Member
router.get("/:id", (request, response) => {
  const found = members.some(
    member => member.id === parseInt(request.params.id)
  );

  if (found) {
    response.json(
      members.filter(member => member.id === parseInt(request.params.id))
    );
  } else {
    response.status(400).json({ msg: `Member ${request.params.id} not found` });
  }
});

// Create Member
router.post("/", (request, response) => {
  const newMember = {
    id: uuid.v4(),
    name: request.body.name,
    email: request.body.email,
    status: "active"
  };

  if (!newMember.name || !newMember.email) {
    return response
      .status(400)
      .json({ msg: "Please include a name and email" });
  }

  members.push(newMember);
  // response.json(members);
  response.redirect("/");
});

// update Member

// Update Member
router.put("/:id", (request, response) => {
  const found = members.some(
    member => member.id === parseInt(request.params.id)
  );

  if (found) {
    const updMember = request.body;
    members.forEach(member => {
      if (member.id === parseInt(request.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;

        response.json({ msg: "Member updated", member });
      }
    });
  } else {
    response.status(400).json({ msg: `Member ${request.params.id} not found` });
  }
});

// Get Single Member
router.delete("/:id", (request, response) => {
  const found = members.some(
    member => member.id === parseInt(request.params.id)
  );

  if (found) {
    response.json({
      msg: "Member Deleted",
      members: members.filter(
        member => member.id !== parseInt(request.params.id)
      )
    });
  } else {
    response.status(400).json({ msg: `Member ${request.params.id} not found` });
  }
});

module.exports = router;
