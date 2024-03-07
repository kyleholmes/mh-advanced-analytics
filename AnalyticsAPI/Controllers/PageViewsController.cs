using AdvancedAnalyticsAPI.Models;
using Azure;
using Azure.Identity;
using Azure.Monitor.Query;
using Azure.Monitor.Query.Models;
using Microsoft.AspNetCore.Mvc;

namespace AdvancedAnalyticsAPI.Controllers
{
    [Route("Analytics")]
    [ApiController]
    public class PageViewsController : ControllerBase
    {
        [HttpGet]
        [Route("GetDeviceTypes")]
        public IEnumerable<DeviceType> GetDeviceTypes()
        {
            string workspaceId = "787c7598-ec4d-443a-9f1c-47534eccb0a2";
            var client = new LogsQueryClient(new DefaultAzureCredential());

            Response<LogsQueryResult> result = client.QueryWorkspace(
                workspaceId,
                "AppPageViews " +
                "| extend AppName = tostring(split(_ResourceId, '/')[-1]) " +
                "| where AppName == 'ain-1pr-webanalytics-01' " +
                "| extend ScreenSize = tostring(Properties.ScreenSize) " +
                "| where notempty(ScreenSize) " +
                "| project Device = case(toint(split(ScreenSize, 'x')[0]) < 768, 'Phone', toint(split(ScreenSize, 'x')[0]) between (768 .. 992),'Tablet', 'Computer') " +
                "| summarize DeviceCount = count() by Device",
                new QueryTimeRange(TimeSpan.FromDays(7)));

            List<DeviceType> deviceTypes = new List<DeviceType>();
            foreach (var row in result.Value.Table.Rows)
            {
                DeviceType deviceType = new DeviceType
                {
                    DeviceName = row[0].ToString(),
                    Count = Convert.ToInt32(row[1])
                };
                deviceTypes.Add(deviceType);
            }

            return deviceTypes;
        }
    }
}
