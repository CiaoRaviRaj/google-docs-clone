const mongoose = require("mongoose");
const Document = require("./Document");

mongoose.connect("mongodb://localhost/google-docs-clone").then(() => {
  console.log("DB connected!");
});

const io = require("socket.io")(3001, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("get-document", async (documentId) => {
    const data = await findOrCreateDocument(documentId);
    socket.join(documentId);

    socket.emit("load-document", data);

    socket.on("send-changes", (delta) => {
      socket.broadcast.emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      await Document.findByIdAndUpdate(documentId, { data });
    });
  });
});

const defaultValues = "";

async function findOrCreateDocument(documentId) {
  if (documentId == null) return;
  const document = await Document.findById(documentId);

  if (document) return document;

  return await Document.create({ _id: documentId, data: defaultValues });
}
