function UserProfile(props) {
    const { name, email } = props;
    return (
        <div className="profile">
            <h1>UserName : {name}</h1>
            <h2>Email    : {email}</h2>
        </div>
    );
}

export default UserProfile;