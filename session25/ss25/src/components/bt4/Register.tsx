import React from "react";

function Register() {
  const styles = {
    container: {
      maxWidth: "400px",
      margin: "60px auto",
      padding: "30px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      textAlign: "center",
      marginBottom: "24px",
      fontSize: "24px",
      color: "#333",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      marginBottom: "6px",
      fontWeight: "bold",
      color: "#555",
    },
    input: {
      padding: "10px",
      marginBottom: "16px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "14px",
    },
    button: {
      padding: "12px",
      backgroundColor: "#007bff",
      color: "white",
      fontWeight: "bold",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    link: {
      textAlign: "center",
      marginTop: "16px",
      fontSize: "14px",
    },
    anchor: {
      color: "#007bff",
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create account</h2>
      <form style={styles.form}>
        <label htmlFor="email" style={styles.label}>Your email</label>
        <input type="email" id="email" placeholder="name@company.com" style={styles.input} />

        <label htmlFor="password" style={styles.label}>Password</label>
        <input type="password" id="password" placeholder="••••••••" style={styles.input} />

        <label htmlFor="confirm" style={styles.label}>Confirm password</label>
        <input type="password" id="confirm" placeholder="••••••••" style={styles.input} />

        <button type="submit" style={styles.button}>Create an account</button>
      </form>
      <p style={styles.link}>
        Already have an account?{" "}
        <a href="/login" style={styles.anchor}>Login here.</a>
      </p>
    </div>
  );
}

export default Register;