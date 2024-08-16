﻿using DataAccess.DAO;
using DataAccess.Mappers;
using DTO;

namespace DataAccess.Crud
{
    public class CitasMedicionCrud : CrudFactory
    {
        CitasMedicionMapper citasMedicionMapper;

        public CitasMedicionCrud() : base() 
        {
            citasMedicionMapper = new CitasMedicionMapper();
            dao = SqlDao.GetInstance();
        }
        public override void Create(BaseClass dto)
        {
            SqlOperation operation = citasMedicionMapper.GetCreateStatement(dto);
            dao.ExecuteStoreProcedure(operation);
        }

        public override void Delete(BaseClass dto)
        {
            throw new NotImplementedException();
        }

        public override List<T> RetrieveAll<T>()
        {
            List<T> resultList = new List<T>();
            SqlOperation operation = citasMedicionMapper.GetRetrieveAllStatement();

            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(operation);
            if (dataResults.Count > 0)
            {
                var dtoList = citasMedicionMapper.BuildObjects(dataResults);
                foreach (var dto in dtoList)
                {
                    resultList.Add((T)Convert.ChangeType(dto, typeof(T)));
                }
            }
            return resultList;
        }

        public override T RetrieveById<T>(int id)
        {
            throw new NotImplementedException();
        }

        public override void Update(BaseClass dto)
        {
            throw new NotImplementedException();
        }

        //public List<T> RetrievebyCorreo<T>(string correo)
        //{
        //    List<T> resultList = new List<T>();
        //    SqlOperation operation = citasMedicionMapper.GetByCorreoStatement(correo);

        //    List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(operation);
        //    if (dataResults.Count > 0)
        //    {
        //        var dtoList = citasMedicionMapper.BuildObjects(dataResults);
        //        foreach (var dto in dtoList)
        //        {
        //            resultList.Add((T)Convert.ChangeType(dto, typeof(T)));
        //        }
        //    }
        //    return resultList;
        //}
    }
}
