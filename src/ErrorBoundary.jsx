// import { Component } from "react";

// export default class ErrorBoundary extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { error: null, info: null };
//   }

//   static getDerivedStateFromError(error) {
//     return { error };
//   }

//   componentDidCatch(error, info) {
//     this.setState({ info });
//     console.error("ErrorBoundary menangkap error:", error, info);
//   }

//   render() {
//     if (this.state.error) {
//       return (
//         <div
//           style={{
//             background: "#1a0000",
//             color: "#ff6b6b",
//             padding: "24px",
//             fontFamily: "monospace",
//             fontSize: "13px",
//             whiteSpace: "pre-wrap",
//             minHeight: "100vh",
//           }}
//         >
//           <h2 style={{ color: "#fff", marginTop: 0 }}>Terjadi error saat render:</h2>
//           <p><strong>{String(this.state.error?.message || this.state.error)}</strong></p>
//           <hr style={{ borderColor: "#333", margin: "16px 0" }} />
//           <p style={{ color: "#999" }}>{this.state.error?.stack}</p>
//           {this.state.info && (
//             <>
//               <hr style={{ borderColor: "#333", margin: "16px 0" }} />
//               <p style={{ color: "#999" }}>{this.state.info.componentStack}</p>
//             </>
//           )}
//         </div>
//       );
//     }
//     return this.props.children;
//   }
// }