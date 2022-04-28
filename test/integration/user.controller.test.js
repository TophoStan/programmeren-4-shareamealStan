const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../index");
let database = [];

chai.should();
chai.use(chaiHttp);

describe("UC-naam", () => {
  describe("UC-201 Registreren als nieuwe gebruiker", () => {
    beforeEach((done) => {
      database = [];
      done();
    });

    it("When a required input is missing, a valid error should be returned", (done) => {
      chai
        .request(server)
        .post("/api/user")
        .send({
          // firtName ontbreekt
          lastName: "Tophoven",
          emailAdress: "mail",
        })
        .end((err, res) => {
          res.should.be.an("object");
          let { status, result } = res.body;
          status.should.equals(400);
          result.should.be
            .a("string")
            .that.equals("firstName must be a string");

          done();
        });
    });
    it("When an emailAdress is not valid, a valid error should be returned", (done) => {
      chai
        .request(server)
        .post("/api/user")
        .send({
          firstName: "Test",
          lastName: "Tophoven",
          emailAdress: 1,
        })
        .end((err, res) => {
          res.should.be.an("object");
          let { status, result } = res.body;
          status.should.equals(400);
          result.should.be
            .a("string")
            .that.equals("emailAdress must be a string");
          done();
        });
    });
    it("When a password is not valid, a valid error should be returned", (done) => {
      chai
        .request(server)
        .post("/api/user")
        .send({
          firstName: "Test",
          lastName: "Tophoven",
          emailAdress: "email",
          password: "",
        })
        .end((err, res) => {
          res.should.be.an("object");
          let { status, result } = res.body;
          status.should.equals(400);
          result.should.be
            .a("string")
            .that.equals("password must be atleast one character long");
          done();
        });
    });
    it("When a user is succesfully added, a valid response should be returned", (done) => {
      const user = {
        firstName: "Test",
        lastName: "Tophoven",
        emailAdress: "email",
        password: "wachtwoord",
      };
      chai
        .request(server)
        .post("/api/user")
        .send(user)
        .end((err, res) => {
          res.should.be.an("object");
          let { status, result } = res.body;
          status.should.equals(200);
          result.firstName.should.be.a("string").that.equals(user.firstName);
          done();
        });
    });
    it("When a user already exists with the same email, a valid error should be returned", (done) => {
      const user = {
        firstName: "test",
        lastName: "doe",
        emailAdress: "testdoe@mail.com",
        password: "wachtwoord",
      };
      chai.request(server).post("/api/user").send(user).end();
      chai
        .request(server)
        .post("/api/user")
        .send(user)
        .end((err, res) => {
          console.log(database);
          res.should.be.an("object");
          let { status, result } = res.body;
          status.should.equals(409);
          result.should.be
            .a("string")
            .that.equals("User is niet toegevoegd in database");
          done();
        });
    });
  });
});
