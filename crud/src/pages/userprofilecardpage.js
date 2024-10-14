import Footer from "../components/Footer"
import Header from "../components/Header"

const { default: UserProfileCard } = require("../components/userprofilecard")

const UserProfileCardPage = () => {
    return(
        <>
        {<Header/>}
        {<UserProfileCard/>}
        {<Footer/>}
        </>
    )
}

export default UserProfileCardPage