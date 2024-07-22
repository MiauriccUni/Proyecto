var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddHttpContextAccessor();

builder.Services.AddSession(session =>
{
    session.Cookie.Name = "simepci-cookie";
    session.IdleTimeout = TimeSpan.FromSeconds(60);
    session.Cookie.HttpOnly = true;
    session.Cookie.IsEssential = false;
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "Demo_Policy",
        policy =>
        {
            policy.AllowAnyOrigin();
            policy.AllowAnyHeader();
            policy.AllowAnyMethod();
        }
        );
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=AdminRecuperacionContrasenna}/{id?}");

app.UseSession();

app.UseCors();

app.Run();
