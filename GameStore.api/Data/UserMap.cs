namespace GameStore.Data;

public static class UserMap
{
    public static readonly List<(string username, string password, string role)> Users = new()
    {
        ("admin", "adminPassword", Roles.Admin),
        ("manager", "managerPassword", Roles.Manager),
        ("user1", "user1Password", Roles.User),
        ("user2", "user2Password", Roles.User),
        ("user3", "user3Password", Roles.User),
    };
}
