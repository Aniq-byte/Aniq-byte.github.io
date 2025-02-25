import { useRef } from 'react';
import { auth, storage, db } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc  } from 'firebase/firestore/lite';



const Home = () => {
    const form = useRef();

    const submitPortfolio = (e) => {
        e.preventDefault();
        const name = form.current[0]?.value;
        const description = form.current[1]?.value;
        const srcCodeUrl = form.current[2]?.value;
        const LiveDemoUrl = form.current[3]?.value;
        const image = form.current[4]?.files[0];

        const storageRef = ref(storage, `portfolio/${image.name}`);

        uploadBytes(storageRef, image).then(
            (snapshot) => {
                getDownloadURL(snapshot.ref).then((downloadUrl) => {
                    savePortfolio({
                        name,
                        description,
                        srcCodeUrl,
                        LiveDemoUrl,
                        image: downloadUrl
                    })
                }, (error) => {
                    console.log('Error getting download URL: ', error);
                    savePortfolio({
                        name,
                        description,
                        srcCodeUrl,
                        LiveDemoUrl,
                        image: null
                    })
                })
            }, (error) => {
                console.log('Error uploading file: ', error);
                savePortfolio({
                    name,
                    description,
                    srcCodeUrl,
                    LiveDemoUrl,
                    image: null
                })
            }
        )
    }

    const savePortfolio = async (portfolio) => {
        console.log(portfolio);
        try {
            await addDoc(collection(db, 'portfolio'), portfolio);
            window.location.reload(false);
        } catch (error) {
            alert('Failed to add portfolio');
        }
    }

    return (
        <div className="dashboard">

            <form ref={form} onSubmit={submitPortfolio}>
                <p><input type="text" placeholder="Name" /></p>
                <p><textarea placeholder="Description" /></p>
                <p><input type="text" placeholder="srcCodeUrl" /></p>
                <p><input type="text" placeholder="LiveDemoUrl" /></p>
                <p><input type="file" placeholder="Image" /></p>
                <button type="submit">Submit</button>
                <button onClick={() => auth.signOut()}>Sign out</button>
            </form>
        </div>
    )
}

export default Home;