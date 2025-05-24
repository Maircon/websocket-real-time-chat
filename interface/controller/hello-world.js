export class HelloWorldController {
  sleep () {
    return new Promise((resolve) => new setTimeout(() => resolve(), 5000));
  }

  async exec (req, res) {
    console.log("received", Date.now());
    await this.sleep();
    res.send({ message: "hello-world" });
  }
}