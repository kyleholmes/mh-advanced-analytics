using AdvancedAnalyticsAPI.Common;
using AdvancedAnalyticsAPI.Models;
using AdvancedAnalyticsAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.ApplicationInsights.Query;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace AdvancedAnalyticsAPI.Controllers
{
    [Route("PageViews")]
    [ApiController]
    public class PageViewsController : ControllerBase
    {
        private readonly AppInsightsService _appInsightsService;
        private readonly ArchitectMainContext _architectMainContext;

        public PageViewsController(AppInsightsService appInsightsService, ArchitectMainContext architectMainContext)
        {
            _appInsightsService = appInsightsService;
            _architectMainContext = architectMainContext;
        }

        [HttpGet]
        [Route("GetDeviceTypes")]
        public async Task<IEnumerable<SimpleCount>> GetDeviceTypes()
        {
            var query = "pageViews "
                + "| where notempty(customDimensions.ScreenSize) "
                + "| project Device = case(toint(split(customDimensions.ScreenSize, 'x')[0]) < 768, 'Phone', "
                + "toint(split(customDimensions.ScreenSize, 'x')[0]) between (768 .. 992),'Tablet', 'Computer') "
                + "| summarize DeviceCount = count() by Device";

            return await _appInsightsService.GetSimpleCount(query);
        }

        [HttpGet]
        [Route("GetScreenSizes")]
        public async Task<IEnumerable<SimpleCount>> GetScreenSizes()
        {
            var query = @"
                pageViews
                    | where notempty(customDimensions.ScreenSize)
                    | project ScreenSize = customDimensions.ScreenSize, Device = case(toint(split(customDimensions.ScreenSize, 'x')[0]) between(992 .. 1200),
                    'Small 992px-1200px', toint(split(customDimensions.ScreenSize, 'x')[0]) between (1200 .. 1800),
                    'Large 1200px-1800px', 'Extra Large 1800px+')
                    | where toint(split(ScreenSize, 'x')[0]) > 992
                    | summarize DeviceCount = count() by Device
                ";

            return await _appInsightsService.GetSimpleCount(query);
        }

        [HttpGet]
        [Route("GetPageLoads")]
        public async Task<IEnumerable<SimpleCount>> GetPageLoads()
        {
            var query = @"
                pageViews
                    | where timestamp >= startofday(ago(7d))
                    | where customDimensions.Page != ''
                    | project PageName = customDimensions.Page
                    | summarize Count = count() by tostring(PageName)
                    | top 5 by Count
                    | order by Count desc
                ";

            return await _appInsightsService.GetSimpleCount(query);
        }

        [HttpGet]
        [Route("GetAllPages")]
        public async Task<IEnumerable<Page>> GetAllPages()
        {
            return await _architectMainContext.Page.FromSqlRaw(StoredProcs.GetAllPages).ToListAsync();
        }

        [HttpGet]
        [Route("GetPageByPageID")]
        public async Task<Page> GetPageByPageID(int PageID)
        {
            List<SqlParameter> sqlParams = new();
            _architectMainContext.AddParameters(sqlParams, "@PageID", SqlDbType.Int, ParameterDirection.Input, Convert.ToInt32(PageID));

            var page = await _architectMainContext.Page.FromSqlRaw(_architectMainContext.BuildSQLComand(StoredProcs.GetPage, sqlParams), sqlParams.ToArray()).ToListAsync();
            return page[0];
        }

        [HttpGet]
        [Route("GetPageAverageLoadTime")]
        public async Task<string> GetPageAverageLoadTime(string PageURL)
        {
            var query = @"
                pageViews 
                | where timestamp >= startofday(ago(30d))
                | where duration > 0 and customDimensions.Page has '" + PageURL + @"'
                | summarize AverageLoadTime = round(avg(duration), 0) / 1000
                | project AverageLoadTime
                ";

            return await _appInsightsService.GetSingleValue(query);
        }

        [HttpGet]
        [Route("GetAllLoadTimes")]
        public async Task<IEnumerable<SimpleStat>> GetAllLoadTimes()
        {
            var query = @"
                pageViews
                | where notempty(duration) and client_Type == 'Browser'
                | extend total_duration=duration*itemCount
                | summarize avg_duration=round((sum(total_duration)/sum(itemCount)),0)/1000 by name
                | top 100 by avg_duration desc
                ";

            return await _appInsightsService.GetSimpleStat(query);
        }

        [HttpGet]
        [Route("GetPageFavoritedBy")]
        public async Task<IEnumerable<User>> GetPageFavoritedBy(int PageID)
        {
            List<SqlParameter> sqlParams = new();
            _architectMainContext.AddParameters(sqlParams, "@PageID", SqlDbType.Int, ParameterDirection.Input, Convert.ToInt32(PageID));

            return await _architectMainContext.User.FromSqlRaw(_architectMainContext.BuildSQLComand(StoredProcs.GetPageFavoritedBy, sqlParams), sqlParams.ToArray()).ToListAsync();
        }
    }
}
