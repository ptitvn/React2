function NotFound() {
  const styles = {
    container: {
      textAlign: "center",
      padding: "80px 20px",
      fontFamily: "Arial, sans-serif",
    },
    code: {
      fontSize: "72px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    message: {
      fontSize: "14px",
      color: "#333",
    },
  };

  return (
    <div  style={styles.container}>
      <div style={styles.code}>404</div>
      <div style={styles.message}>Not Found</div>
    </div>
  );
}

export default NotFound;