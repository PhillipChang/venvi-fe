import app from "./index";

export default {
  
  // Marketplace get all listings of cars
    getAllListings() {
      app.get("/api/listings/all").then(res => console.log(res.data));
    },

  // Reviews get all reviews of cars
  getReviews() {
    app.get("/api/review").then(res => console.log(res.data));
  },
    postQuery() {
      app.post("/api/vehicle/new", {msg: "Vehicle has been added"}).then(res => console.log(res.data));
    },
  
    putQuery(id) {
      app.put(`/api/vehicle/update/${id}`, {msg: "update this listing"}).then(res => {
        console.log(res.data);
      })
    },
  
    deleteQuery(id) {
      app.delete(`/api/vehicle/delete/${id}`, {msg: "delete this listing"}).then(res => {
        console.log(res.data);
      })
    }
  }