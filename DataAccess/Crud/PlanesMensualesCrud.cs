﻿using DataAccess.DAO;
using DataAccess.Mappers;
using DTO;

namespace DataAccess.Crud
{
    public class PlanesMensualesCrud : CrudFactory
    {
        PlanesMensualesMapper planesMensualesMapper;

        public PlanesMensualesCrud() : base()
        {
            planesMensualesMapper = new PlanesMensualesMapper();
            dao = SqlDao.GetInstance();
        }
        public override void Create(BaseClass dto)
        {
            SqlOperation operation = planesMensualesMapper.GetCreateStatement(dto);
            dao.ExecuteStoreProcedure(operation);
        }

        public override void Delete(BaseClass dto)
        {
            throw new NotImplementedException();
        }

        public override List<T> RetrieveAll<T>()
        {
            List<T> resultList = new List<T>();
            SqlOperation operation = planesMensualesMapper.GetRetrieveAllStatement();

            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(operation);
            if (dataResults.Count > 0)
            {
                var dtoList = planesMensualesMapper.BuildObjects(dataResults);
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

        public void UpdateCuponCrud(int CuponDescuentoId, int UsuarioID)
        {
            SqlOperation operation = planesMensualesMapper.UpdateCupon(CuponDescuentoId, UsuarioID);
            dao.ExecuteStoreProcedure(operation);
        }

        // RetreiveByCorreo
        public List<T> RetrieveByCorreoCrud<T>(string Correo)
        {
            List<T> resultList = new List<T>();
            SqlOperation operation = planesMensualesMapper.GetRetriveByCorreo(Correo);

            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(operation);

            if (dataResults.Count > 0)
            {
                var dtoList = planesMensualesMapper.BuildObjects(dataResults);
                foreach (var dto in dtoList)
                {
                    resultList.Add((T)Convert.ChangeType(dto, typeof(T)));
                }
            }
            return resultList;
        }


        // Revisar
        public override void Update(BaseClass dto)
        {
            SqlOperation operation = planesMensualesMapper.GetCreateStatement(dto);
            dao.ExecuteStoreProcedure(operation);
        }

        public List<PlanesMensuales> RetrieveBycorreo<T>(string correo)
        {
            throw new NotImplementedException();
        }
    }
}
