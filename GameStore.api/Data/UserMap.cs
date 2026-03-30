namespace GameStore.Data;

public static class UserMap
{
    public static readonly List<(string username, string password, string role)> Users = new()
    {
        ("admin", "adminPassword", Roles.Admin),
        ("manager", "managerPassword", Roles.Manager),
        ("user", "userPassword", Roles.User),
    };
}
