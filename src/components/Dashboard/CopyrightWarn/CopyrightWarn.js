const CopyrightWarn = ({ setShowCRWarn }) => {
  const closeCRWarn = () => {
    setShowCRWarn(false);
    sessionStorage.setItem('cr-warn-shown', 'true');
  }

  return (
    <div className="copyright-warn">
      <div className="cr-warn-container">
        <h2>Warning</h2>
        <p>This website was created as a project for Front-End developer’s portfolio and NOT for commercial use.</p>
        <p>To avoid copyright issues all media content was replaced with Public Domain content.</p>
        <button className="close-cr-warn" onClick={closeCRWarn}>Close</button>
      </div>
    </div>
  )
}

export default CopyrightWarn