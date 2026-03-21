function UserCard({ user }) {
    // console.log(user);
    return (
        <article
            style={{
                border: "1px solid #e5e5e5",
                borderRadius: "12px",
                padding: "14px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.06)",
                backgroundColor: "#fff",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <img
                    src={user.picture.medium}
                    alt={`${user.name.first} ${user.name.last}`}
                    style={{ width: "52px", height: "52px", borderRadius: "50%" }}
                />
                <h3 style={{ margin: 0 }}>
                    {user.name.title} {user.name.first} {user.name.last}
                </h3>
            </div>

            <p style={{ margin: "6px 0" }}><strong>Email:</strong> {user.email}</p>
            <p style={{ margin: "6px 0" }}><strong>Phone:</strong> {user.phone}</p>
            <p style={{ margin: "6px 0" }}><strong>Country:</strong> {user.location.country}</p>
            <p style={{ margin: "6px 0" }}><strong>Username:</strong> {user.login.username}</p>
        </article>
    )
}

export default UserCard;
