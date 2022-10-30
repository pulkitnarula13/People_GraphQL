const getStyles = () => ({
    title: {
      fontSize: 50,
      padding: '15px',
      marginBottom: '50px',
      textTransform: 'Uppercase'

    }
  })
  
  const Title = ()=> {
    const styles = getStyles()
  
    return <h1 style={styles.title}>People and their Cars</h1>
  }
  
  export default Title;