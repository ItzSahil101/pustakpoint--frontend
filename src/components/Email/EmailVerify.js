import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../../images/OIP (4).jfif";
import styles from "./styles.module.css";
import { Fragment } from "react";


const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true)
	const param = useParams()

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `https://pustak-point-backend.vercel.app/api/users/${param.id}/verify/${param.token}`;
				const { data } = await axios.get(url);
				console.log(data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);

    return (
        <>
            {validUrl ? (
                <div className={styles.container}>
                    <img src={success} alt="success_img" className={styles.success_img} />
                    <h1>Email verified successfully</h1>
                    <Link to="/log">
                        <button className={styles.green_btn}>Login</button>
                    </Link>
                </div>
            ) : (
                <h1>verified!! Go $ Login Now!</h1>
            )}
        </>
    );
};

export default EmailVerify;