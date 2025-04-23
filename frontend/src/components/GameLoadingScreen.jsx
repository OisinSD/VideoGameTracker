import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../authentication/firebaseConfig";

const GameLoadingScreen = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);

    const user = auth.currentUser;
    const email = user?.email || "player";

    useEffect(() => {
        const duration = 2000;
        const steps = 20;
        const intervalTime = duration / steps;

        let current = 0;
        const interval = setInterval(() => {
            current += 100 / steps;
            const safeProgress = Math.min(current, 100); // prevent going over
            setProgress(safeProgress);

            if (safeProgress >= 100) {
                clearInterval(interval);
                navigate("/");
            }
        }, intervalTime);


        return () => clearInterval(interval);
    }, [navigate]);

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center px-3">
            <h1 className="mb-4">🎮 Game Loading...</h1>
            <p className="mb-3">Welcome back, {email}</p>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <div className="progress">
                    <div
                        className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                        role="progressbar"
                        style={{ width: `${progress}%` }}
                        aria-valuenow={progress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    />
                </div>
            </div>
        </div>
    );
};

export default GameLoadingScreen;
