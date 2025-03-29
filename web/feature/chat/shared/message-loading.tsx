/**
 * MessageLoading displays a 3-dot animated loading indicator used to simulate typing or message loading in chat interfaces.*/

function MessageLoading() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="text-foreground"
    >
      <circle cx="4" cy="12" r="2" fill="currentColor">
        <animate
          id="spinner_qFRN"
          begin="0;spinner_OcgL.end+0.25s"
          attributeName="cy"
          calcMode="spline"
          dur="0.6s"
          values="12;6;12"
          keySplines=".33,.66,.66,1;.33,0,.66,.33"
        />
      </circle>
      <circle cx="12" cy="12" r="2" fill="currentColor">
        <animate
          begin="spinner_qFRN.begin+0.1s"
          attributeName="cy"
          calcMode="spline"
          dur="0.6s"
          values="12;6;12"
          keySplines=".33,.66,.66,1;.33,0,.66,.33"
        />
      </circle>
      <circle cx="20" cy="12" r="2" fill="currentColor">
        <animate
          id="spinner_OcgL"
          begin="spinner_qFRN.begin+0.2s"
          attributeName="cy"
          calcMode="spline"
          dur="0.6s"
          values="12;6;12"
          keySplines=".33,.66,.66,1;.33,0,.66,.33"
        />
      </circle>
    </svg>
  );
}

export { MessageLoading };

/**
 * DarkThemeMessageLoading renders the same animation
 * but forces a dark color (e.g., white dots), useful in manually styled dark UI sections.
 */
// function DarkThemeMessageLoading() {
//   return (
//     <svg
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       xmlns="http://www.w3.org/2000/svg"
//       className="text-white"
//     >
//       <circle cx="4" cy="12" r="2" fill="currentColor">
//         <animate
//           id="spinner_dark_qFRN"
//           begin="0;spinner_dark_OcgL.end+0.25s"
//           attributeName="cy"
//           calcMode="spline"
//           dur="0.6s"
//           values="12;6;12"
//           keySplines=".33,.66,.66,1;.33,0,.66,.33"
//         />
//       </circle>
//       <circle cx="12" cy="12" r="2" fill="currentColor">
//         <animate
//           begin="spinner_dark_qFRN.begin+0.1s"
//           attributeName="cy"
//           calcMode="spline"
//           dur="0.6s"
//           values="12;6;12"
//           keySplines=".33,.66,.66,1;.33,0,.66,.33"
//         />
//       </circle>
//       <circle cx="20" cy="12" r="2" fill="currentColor">
//         <animate
//           id="spinner_dark_OcgL"
//           begin="spinner_dark_qFRN.begin+0.2s"
//           attributeName="cy"
//           calcMode="spline"
//           dur="0.6s"
//           values="12;6;12"
//           keySplines=".33,.66,.66,1;.33,0,.66,.33"
//         />
//       </circle>
//     </svg>
//   );
// }

// export { DarkThemeMessageLoading };
