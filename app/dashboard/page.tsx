import Content from "@/app/components/dbComponents/Content"
import { DashboardLayout } from './Layout'

export default function HomePage() {
    return (
        <DashboardLayout title='Home'>
            <Content title="Home" />
        </DashboardLayout>
    )
}
