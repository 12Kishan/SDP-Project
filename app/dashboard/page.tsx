import MyDashboard from "../components/dashboardComponents/myDashboard"


export const metadata = {
    title: "Dashboard | QuizBee"
}

async function Dashboard() {
    return (<>
        <MyDashboard />
    </>
    )
}

export default Dashboard