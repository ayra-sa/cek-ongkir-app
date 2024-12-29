import Input from "@/components/Input";
import Layout from "@/components/Layout";
import Select from "@/components/Select";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Cost = () => {
  const [loadingProvince, setLoadingProvince] = useState(false);
  const [loadingCost, setLoadingCost] = useState(false);
  const [loadingCityOrigin, setLoadingCityOrigin] = useState(false);
  const [loadingCityDestination, setLoadingCityDestination] = useState(false);
  const [provinces, setProvinces] = useState<ProvinceProps[] | null>(null);
  const [citiesOrigin, setCitiesOrigin] = useState<CityProps[] | null>(null);
  const [citiesDestination, setCitiesDestination] = useState<
    CityProps[] | null
  >(null);
  const [provinceOriginQuery, setProvinceOriginQuery] = useState("");
  const [provinceDestinationQuery, setProvinceDestinationQuery] = useState("");
  const [cityOriginQuery, setCityOriginQuery] = useState("");
  const [cityDestinationQuery, setCityDestinationQuery] = useState("");
  const [weightQuery, setWeightQuery] = useState("");
  const [courierQuery, setCourierQuery] = useState("");
  const [costResults, setCostResults] = useState<CostResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getProvinces = async () => {
    setLoadingProvince(true);
    try {
      const res = await axios.get(`/api/rajaongkir/province`);
      setProvinces(res.data.rajaongkir.results);
    } catch (error) {
      setError("Gagal memuat daftar provinsi");
      console.error("Error fetching provinces:", error);
    } finally {
      setLoadingProvince(false);
    }
  };

  const getCity = async (provinceId: string, isOrigin: boolean) => {
    const setLoading = isOrigin
      ? setLoadingCityOrigin
      : setLoadingCityDestination;
    const setCities = isOrigin ? setCitiesOrigin : setCitiesDestination;

    setLoading(true);
    try {
      const res = await axios.get(
        `/api/rajaongkir/city?province=${provinceId}`
      );
      setCities(res.data.rajaongkir.results);
    } catch (error) {
      setError("Gagal memuat daftar kota");
      console.error("Error fetching cities:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !cityOriginQuery ||
      !cityDestinationQuery ||
      !weightQuery ||
      !courierQuery
    ) {
      setError("Semua field wajib diisi!");
      return;
    }

    try {
      setLoadingCost(true);
      const res = await axios.post(`/api/rajaongkir/cost`, {
        origin: cityOriginQuery,
        destination: cityDestinationQuery,
        weight: Number(weightQuery),
        courier: courierQuery,
      });
      setCostResults(res.data.rajaongkir);
    } catch (error) {
      setError("Gagal menghitung ongkir");
      console.error("Error calculating cost:", error);
    } finally {
      setLoadingCost(false);
    }
  };

  useEffect(() => {
    getProvinces();
  }, []);

  useEffect(() => {
    if (provinceOriginQuery) {
      getCity(provinceOriginQuery, true);
    }
  }, [provinceOriginQuery]);

  useEffect(() => {
    if (provinceDestinationQuery) {
      getCity(provinceDestinationQuery, false);
    }
  }, [provinceDestinationQuery]);

  return (
    <Layout title="Cost">
      <h1 className="font-bold text-2xl mb-5">Cek Ongkir di sini</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmitForm} className="space-y-4">
        <div>
          <h2 className="font-semibold text-lg">Kota Asal:</h2>

          <div className="flex items-center gap-x-5">
            <Select
              id="provincesOrigin"
              label="Pilih Provinsi"
              name="provincesOrigin"
              data={
                provinces?.map((p) => ({
                  name: p.province,
                  value: p.province_id,
                })) || []
              }
              value={provinceOriginQuery}
              handleChange={(e) => setProvinceOriginQuery(e.target.value)}
              disabled={loadingProvince}
            />
            <Select
              id="citiesOrigin"
              label="Pilih Kota"
              name="citiesOrigin"
              data={
                citiesOrigin?.map((c) => ({
                  name: c.city_name,
                  value: c.city_id,
                })) || []
              }
              value={cityOriginQuery}
              handleChange={(e) => setCityOriginQuery(e.target.value)}
              disabled={!citiesOrigin || loadingCityOrigin}
            />
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-lg">Kota Tujuan:</h2>

          <div className="flex items-center gap-x-5">
            <Select
              id="provincesDestination"
              label="Pilih Provinsi"
              name="provincesDestination"
              data={
                provinces?.map((p) => ({
                  name: p.province,
                  value: p.province_id,
                })) || []
              }
              value={provinceDestinationQuery}
              handleChange={(e) => setProvinceDestinationQuery(e.target.value)}
              disabled={loadingProvince}
            />
            <Select
              id="citiesDestination"
              label="Pilih Kota"
              name="citiesDestination"
              data={
                citiesDestination?.map((c) => ({
                  name: c.city_name,
                  value: c.city_id,
                })) || []
              }
              value={cityDestinationQuery}
              handleChange={(e) => setCityDestinationQuery(e.target.value)}
              disabled={!citiesDestination || loadingCityDestination}
            />
          </div>
        </div>
        <Input
          id="weight"
          label="Berat Kiriman (gram)"
          name="weight"
          value={weightQuery}
          handleChange={(e) => setWeightQuery(e.target.value)}
        />
        <Select
          id="couriers"
          label="Pilih Kurir"
          name="couriers"
          data={[
            { name: "JNE", value: "jne" },
            { name: "TIKI", value: "tiki" },
            { name: "POS", value: "pos" },
          ]}
          value={courierQuery}
          handleChange={(e) => setCourierQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 px-5 py-2 text-white font-medium rounded-md"
          disabled={loadingCost}
        >
          {loadingCost ? "Loading.." : "Cek Ongkir"}
        </button>
      </form>

      {loadingCost ? (
        <p className="mt-10">Loading..</p>
      ) : costResults && costResults.status.code === 200 ? (
        <div className="mt-10 rounded-md">
          <h1 className="text-xl font-bold mb-4">Hasil Pengecekan</h1>

          <div className="mb-6">
            <p>
              <strong>{costResults.origin_details.city_name}</strong> ke{" "}
              <strong>{costResults.destination_details.city_name}</strong> @
              <strong>{costResults.query.weight}</strong> gram
            </p>
            <p>
              <strong>Kurir:</strong> {costResults.query.courier.toUpperCase()}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-1">
              Layanan yang tersedia :
            </h2>
            {costResults.results.map((result, index) => (
              <div key={index} className="mb-4">
                <h3>
                  {result.name} ({result.code.toUpperCase()})
                </h3>
                {result.costs.length > 0 ? result.costs.map((service, serviceIndex) => (
                  <div className="border-t py-2" key={serviceIndex}>
                    <p>{service.service}</p>
                    <p>{service.description}</p>
                    {service.cost.map((costDetail, costIndex) => (
                      <div key={costIndex}>
                        <p>
                          <strong>Tarif:</strong> Rp{" "}
                          {costDetail.value.toLocaleString()}
                        </p>
                        <p>
                          <strong>Estimasi Waktu:</strong>{" "}
                          {costDetail.etd ? `${costDetail.etd.toUpperCase().includes("HARI") ? costDetail.etd : `${costDetail.etd} Hari`}` : "N/A"}
                        </p>
                        <p>
                          <strong>Note:</strong> {costDetail.note || "-"}
                        </p>
                      </div>
                    ))}
                  </div>
                )) : <p className="mt-3">Hasil tidak ditemukan!</p>}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </Layout>
  );
};

export default Cost;
