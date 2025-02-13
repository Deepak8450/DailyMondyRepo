import React, { useState, useEffect } from "react";
import { db } from "./firebaseconfig"; // Ensure correct Firebase import
import { collection, addDoc, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore";
import "./Star.css";

const StarRate = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  // 🔥 Fetch reviews and listen for real-time updates
  useEffect(() => {
    const reviewsCollection = collection(db, "ratings");
    const q = query(reviewsCollection, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const reviewsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched reviews:", reviewsData); // Debugging log

        setReviews(reviewsData); // ✅ Update reviews state

        // ✅ Calculate and update the average rating
        if (reviewsData.length > 0) {
          const totalRating = reviewsData.reduce((sum, r) => sum + (r.rating || 0), 0);
          setAverageRating((totalRating / reviewsData.length).toFixed(1));
        } else {
          setAverageRating(0);
        }
      },
      (error) => {
        console.error("Firestore error:", error);
      }
    );

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // 🔥 Handle Rating & Comment Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || comment.trim() === "") {
      alert("Please provide a rating and a comment.");
      return;
    }

    try {
      await addDoc(collection(db, "ratings"), {
        rating,
        comment,
        timestamp: Timestamp.fromDate(new Date()), // ✅ Correct timestamp format
      });

      setRating(0);
      setComment("");
      
    } catch (error) {
      console.error("Error adding review:", error);
      alert("Failed to submit. Check Firestore rules.");
    }
  };

  return (
    <div className="rating-container" style={{ textAlign: "center", maxWidth: "500px", margin: "auto" }}>
      <h2>Rate Our Website</h2>

      {/* ⭐ Star Rating Input */}
      <div style={{display:"flex"}}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          style={{
            fontSize: "30px",
            cursor: "pointer",
            color: star <= rating ? "gold" : "orange",
            transition: "color 0.2s",
            display:"flex"
          }}
        >
          <i className="fa-solid fa-star"></i>
        </span>
      ))}
   </div>
      {/* 💬 Comment Input */}
      <form className="comment-box" onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
        <textarea
          placeholder="Write your feedback..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{
            width: "100%",
            height: "60px",
            marginBottom: "10px",
            padding: "5px",
          }}
        />
        <button type="submit" className="submit-btn" style={{ padding: "5px 15px", cursor: "pointer" }}>
          Submit
        </button>
      </form>

      {/* 📊 Display Average Rating */}
      <p>Average Rating: {averageRating} ⭐</p>

      {/* 📝 Display Reviews */}
      <h3>User Reviews</h3>
      <ul style={{ textAlign: "left", padding: 0 }}>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((rev) => (
            <li
              key={rev.id}
              style={{
                marginBottom: "10px",
                listStyle: "none",
                borderBottom: "1px solid #ccc",
                paddingBottom: "5px",
              }}
            >
              <strong>{rev.rating} <i className="fa-solid fa-star" style={{ color: "orange" }}></i></strong>
              <p>{rev.comment}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default StarRate;
