import React from 'react';
function ContactPage() {
    return (
        <div style={styles.container}>
            <img src="/cv.png" alt="CV" style={styles.image}/> 
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', 
    },
    image: {
        height: '90%', 
        maxWidth: '100%'
    }
}

export default ContactPage;