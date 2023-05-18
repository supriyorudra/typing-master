import { useEffect, useState } from "react"
import { auth, db } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import TableUserData from "../Components/TableUserData";
import Graph from "../Components/Graph";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import UserInfo from "../Components/UserInfo";
import { useTheme } from "../Context/ThemeContext";

const User = () => {

    const [data, setData] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const {theme} = useTheme();

    const fetchUserData = () => {
        const resultsRef = db.collection('Results');
        const { uid } = auth.currentUser;
        let tempData = [];
        let tempGraphData = [];
        resultsRef
            .where('userId', '==', uid)
            .orderBy('timeStamp', 'desc')
            .get()
            .then(snapshot => {
                snapshot.docs.map(doc => {
                    tempData.push({ ...doc.data() });
                    tempGraphData.push([doc.data().timeStamp.toDate().toLocaleString().split(','), doc.data().wpm]);
                })
                setData(tempData);
                setGraphData(tempGraphData.reverse());
            })
    };

    useEffect(() => {
        if (!loading) {
            fetchUserData();
        }
        if (!loading && !user) {
            navigate('/');
        }
    }, [loading])

    if (loading) {
        return <div className="center-of-screen">
            <CircularProgress style={{color: theme.textColor}}/>
        </div>
    }


    return (
        <div className="canvas user-canvas">
            <Header />
            <UserInfo totalTestTaken={data.length} />
            <div className="graph-user-page">
                <Graph graphData={graphData} type='date' />
            </div>
            <TableUserData data={data} />
            <Footer />
        </div>
    )
}

export default User;