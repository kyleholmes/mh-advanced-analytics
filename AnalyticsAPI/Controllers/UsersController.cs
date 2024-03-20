using AdvancedAnalyticsAPI.Common;
using AdvancedAnalyticsAPI.Models;
using AdvancedAnalyticsAPI.Services;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.ApplicationInsights.Query;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using System.Net.NetworkInformation;
using System.Reflection;

namespace AdvancedAnalyticsAPI.Controllers
{
    [Route("Events")]
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
    }
}
