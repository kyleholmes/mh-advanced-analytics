using AdvancedAnalyticsAPI.Common;
using AdvancedAnalyticsAPI.Models;
using AdvancedAnalyticsAPI.Services;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.ApplicationInsights.Query;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using System.Data;
using System.Net.NetworkInformation;
using System.Reflection;

namespace AdvancedAnalyticsAPI.Controllers
{
    [Route("Users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppInsightsService _appInsightsService;
        private readonly ArchitectMainContext _architectMainContext;

        public UsersController(AppInsightsService appInsightsService, ArchitectMainContext architectMainContext)
        {
            _appInsightsService = appInsightsService;
            _architectMainContext = architectMainContext;
        }

        [HttpGet]
        [Route("GetAllUsers")]
        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await _architectMainContext.User.FromSqlRaw(StoredProcs.GetAllUsers).ToListAsync();
        }

        [HttpGet]
        [Route("GetUser")]
        public async Task<User> GetUser(int UID)
        {
            List<SqlParameter> sqlParams = new();
            _architectMainContext.AddParameters(sqlParams, "@UID", SqlDbType.Int, ParameterDirection.Input, Convert.ToInt32(UID));

            var user = await _architectMainContext.User.FromSqlRaw(_architectMainContext.BuildSQLComand(StoredProcs.GetUser, sqlParams), sqlParams.ToArray()).ToListAsync();
            return user[0];

        }
    }
}
