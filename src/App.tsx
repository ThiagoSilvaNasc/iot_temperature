import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Thermometer } from 'lucide-react';
import { database } from './firebaseConfig';
import { ref, onValue } from "firebase/database";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [tank1Data, setTank1Data] = useState<number[]>([]);
  const [tank2Data, setTank2Data] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const tank1Ref = ref(database, 'sensorData/sensor1');
    const tank2Ref = ref(database, 'sensorData/sensor2');

    onValue(tank1Ref, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const timestamps = Object.keys(data);
        setTank1Data(timestamps.map(ts => data[ts].temperature));
        setLabels(timestamps.map(ts => new Date(parseInt(ts)).toLocaleTimeString()));
      }
    });

    onValue(tank2Ref, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setTank2Data(Object.keys(data).map(ts => data[ts].temperature));
      }
    });

  }, []);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Tanque 1',
        data: tank1Data,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderWidth: 1, // Linha mais fina
        pointRadius: 0, // Remove os pontos
        pointHoverRadius: 0, // Não mostra ponto ao passar o mouse
        tension: 0.4,
      },
      {
        label: 'Tanque 2',
        data: tank2Data,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 1, // Linha mais fina
        pointRadius: 0, // Remove os pontos
        pointHoverRadius: 0, // Não mostra ponto ao passar o mouse
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Comparação de Temperatura dos Tanques',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Temperatura (°C)',
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-center mb-6">
            <Thermometer className="h-8 w-8 text-blue-500 mr-3" />
            <h1 className="text-2xl font-bold text-gray-800">Monitor de Temperatura</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-blue-800 mb-2">Tanque 1</h2>
              <p className="text-3xl font-bold text-blue-600">
                {tank1Data[tank1Data.length - 1]?.toFixed(1)}°C
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-red-800 mb-2">Tanque 2</h2>
              <p className="text-3xl font-bold text-red-600">
                {tank2Data[tank2Data.length - 1]?.toFixed(1)}°C
              </p>
            </div>
          </div>

          <div className="h-[600px] w-full">
            <Line data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;