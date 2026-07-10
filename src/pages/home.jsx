
import { useState } from "react";
import "../components/button";

function Home() {
   const [submitting, setSubmitting] = useState(false);

  const handleHome = (e) => {
    e.preventDefault();
    setSubmitting(true);

};

return(

     <div className='mb-3'>
                <button type="submit" variant="primary" fullWidth disabled={submitting}>
                    {submitting ? 'Loading...' : 'Masuk'}
                </button>
            </div>

 );
}




export default Home;