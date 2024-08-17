using DataAccess.DAO;
using DataAccess.Mappers;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Crud
{
    public class RutinaCrud:CrudFactory
    {
        RutinasMapper rutinasMapper;
        public RutinaCrud() : base()

        {
            rutinasMapper = new RutinasMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseClass dto)
        {
            SqlOperation operation = rutinasMapper.GetCreateStatement(dto);
            dao.ExecuteStoreProcedure(operation);
        }

        public override void Delete(BaseClass dto)
        {
            throw new NotImplementedException();
        }

        public override List<T> RetrieveAll<T>()
        {
            List<T> resultList = new List<T>();
            SqlOperation operation = rutinasMapper.GetRetrieveAllStatement();

            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(operation);
            if (dataResults.Count > 0)
            {
                var dtoList = rutinasMapper.BuildObjects(dataResults);
                foreach (var dto in dtoList)
                {
                    resultList.Add((T)Convert.ChangeType(dto, typeof(T)));
                }
            }
            return resultList;
        }

        public override T RetrieveById<T>(int id)
        {
            //List<T> result = new List<T>();
            //SqlOperation operation = usuarioMapper.GetRetrieveByIdStatement(id);

            //List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(operation);

            //if(dataResults.Count > 0)
            //{
            //    var dtoList = usuarioMapper.BuildObjects(dataResults);
            //    foreach(var dto in dtoList)
            //    {
            //        result
            //    }
            //}
            throw new NotImplementedException();
        }
        public override void Update(BaseClass dto)
        {
            throw new NotImplementedException();
        }

        public List<T> RetrieveBynombre_ejercicio<T>(string NombreEjercicio)
        {
            List<T> resultList = new List<T>();
            SqlOperation operation = rutinasMapper.GetRetrieveBynombre_ejercicio(NombreEjercicio);

            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(operation);

            if (dataResults.Count > 0)
            {
                var dtoList = rutinasMapper.BuildObjects(dataResults);
                foreach (var dto in dtoList)
                {
                    resultList.Add((T)Convert.ChangeType(dto, typeof(T)));
                }
            }  
            return resultList;

        }
        public List<T> RetrieveBytipos_de_ejercicio<T>(string TiposEjercicio)
        {
            List<T> resultList = new List<T>();
            SqlOperation operation = rutinasMapper.GetRetrieveBytipo_de_ejercicio(TiposEjercicio);

            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(operation);

            if (dataResults.Count > 0)
            {
                var dtoList = rutinasMapper.BuildObjects(dataResults);
                foreach (var dto in dtoList)
                {
                    resultList.Add((T)Convert.ChangeType(dto, typeof(T)));
                }
            }
            return resultList;

        }  public List<T> RetrieveByRepeticiones<T>(int Repeticiones)
        {
            List<T> resultList = new List<T>();
            SqlOperation operation = rutinasMapper.GetRetrieveBytRepeticiones(Repeticiones);

            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(operation);

            if (dataResults.Count > 0)
            {
                var dtoList = rutinasMapper.BuildObjects(dataResults);
                foreach (var dto in dtoList)
                {
                    resultList.Add((T)Convert.ChangeType(dto, typeof(T)));
                }
            }
            return resultList;

        }  public List<T> RetrieveBySeries<T>(int series)
        {
            List<T> resultList = new List<T>();
            SqlOperation operation = rutinasMapper.GetRetrieveBySeries(series);

            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(operation);

            if (dataResults.Count > 0)
            {
                var dtoList = rutinasMapper.BuildObjects(dataResults);
                foreach (var dto in dtoList)
                {
                    resultList.Add((T)Convert.ChangeType(dto, typeof(T)));
                }
            }
            return resultList;

        } public List<T> RetrieveBycorreo<T>(string Correo)
        {
            List<T> resultList = new List<T>();
            SqlOperation operation = rutinasMapper.GetRetrieveByCorreo(Correo);

            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(operation);

            if (dataResults.Count > 0)
            {
                var dtoList = rutinasMapper.BuildObjects(dataResults);
                foreach (var dto in dtoList)
                {
                    resultList.Add((T)Convert.ChangeType(dto, typeof(T)));
                }
            }
            return resultList;

        }
    }
}
