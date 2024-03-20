using AdvancedAnalyticsAPI.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;

namespace AdvancedAnalyticsAPI.Common
{
    public class ArchitectMainContext : DbContext
    {
        public ArchitectMainContext(DbContextOptions<ArchitectMainContext> options)
            : base(options)
        {
        }

        #region Public Members
        public DbSet<User> User { get; set; }
        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasNoKey();
        }

        public void AddParameters(List<SqlParameter> Parameters, string ParameterName, SqlDbType sqlDbType, ParameterDirection parameterDirection, object value)
        {
            if (!string.IsNullOrEmpty(ParameterName))
            {
                if (value != null)
                {
                    Parameters.Add(new SqlParameter()
                    {
                        ParameterName = ParameterName,
                        SqlDbType = sqlDbType,
                        Direction = parameterDirection,
                        Value = value
                    });
                }
                else
                {
                    Parameters.Add(new SqlParameter()
                    {
                        ParameterName = ParameterName,
                        SqlDbType = sqlDbType,
                        Direction = parameterDirection,
                        Value = DBNull.Value
                    });
                }
            }
            else
            {
                throw new Exception("Parameter name is blank");
            }
        }

        public string BuildSQLComand(string sqlCommand, List<SqlParameter> parameters)
        {
            sqlCommand += " ";
            if (parameters?.Count > 0)
            {
                foreach (SqlParameter sqlParameter in parameters)
                {
                    sqlCommand = sqlCommand + sqlParameter.ParameterName + ",";
                }
                sqlCommand = sqlCommand.TrimEnd(',');
            }

            return sqlCommand;
        }
    }
}
