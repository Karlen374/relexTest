import Test from "../models/Test.js";

class TestController {
  async create (req, res) {
    try {
      const { id, name, status, questions } = req.body
      const test = await Test.create({ id, name, status, questions })
      res.status(200).json(test)
    } catch (e) {
      res.status(500).json(e)
    }
  }
  async getAll (req,res) {
    try {
      const Tests = await Test.find()
      return res.json(Tests.map((item) => { 
        return {id:item.id, status: item.status, name: item.name, questions: item.questions}
      }));
    } catch (e){
      res.status(500).json(e)
    }
  }
  async changeTestStatus (req, res) {
    try {
      const testId = req.body.testId
      const test = (await Test.find()).filter((item) => item.id === testId)[0]
      test.status = !test.status;
      const updatedTest = await Test.findByIdAndUpdate(test._id,test,{new:true})
      return res.status(200).json({id:updatedTest.id, status: updatedTest.status, name: updatedTest.name, questions: updatedTest.questions})
    } catch (e) {
      res.status(500).json(e)
    }
  }
  async delTestById (req,res) {
    try {
      const testId = req.body.testId
      const delTest = await Test.deleteOne({id:testId})
      return res.status(200).json(testId)
    } catch (e){
      res.status(500).json(e);
    }
  }
}

export default new TestController();