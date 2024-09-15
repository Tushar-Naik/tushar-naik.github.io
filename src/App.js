import React, { useState, useCallback, useMemo } from 'react';
import { useCSVReader } from 'react-papaparse';
import { AlertCircle, Upload, Edit3 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const distributePlayersBySkillAndPosition = (players, numTeams) => {
  const teams = Array.from({ length: numTeams }, () => []);
  const skillLevels = [...new Set(players.map(player => player['Skill Level']))];

  const playersBySkill = skillLevels.map(skill =>
      shuffleArray(players.filter(player => player['Skill Level'] === skill))
  );

  let currentTeamIndex = 0;
  const flattenedPlayers = playersBySkill.flat();

  for (let i = 0; i < flattenedPlayers.length; i++) {
    teams[currentTeamIndex].push(flattenedPlayers[i]);
    currentTeamIndex = (currentTeamIndex + 1) % numTeams;
  }

  return teams;
};

const TeamFormationTool = () => {
  const [players, setPlayers] = useState([]);
  const [numTeams, setNumTeams] = useState(2);
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [manualInput, setManualInput] = useState('');
  const [activeTab, setActiveTab] = useState(null);
  const { CSVReader } = useCSVReader();

  const skillLevels = useMemo(() =>
          [...new Set(players.map(player => player['Skill Level']))],
      [players]
  );

  const handleCSVUpload = useCallback((results) => {
    const parsedPlayers = results.data.slice(1).map(row => ({
      'Full Name': row[0],
      'Preferred Position': row[1],
      'Skill Level': row[2]
    }));
    setPlayers(parsedPlayers);
    setError('');
  }, []);

  const handleCSVError = useCallback((error) => {
    setError(`Error parsing CSV: ${error.message}`);
  }, []);

  const handleManualInput = () => {
    const lines = manualInput.split('\n').filter(line => line.trim() !== '');
    const parsedPlayers = lines.map(line => {
      const [fullName, preferredPosition, skillLevel] = line.split(',').map(item => item.trim());
      return { 'Full Name': fullName, 'Preferred Position': preferredPosition, 'Skill Level': skillLevel };
    });
    setPlayers(parsedPlayers);
    setError('');
  };

  const handleFormTeams = () => {
    if (players.length === 0) {
      setError('Please upload a CSV file or enter player data manually first.');
      return;
    }
    if (numTeams <= 0 || numTeams > players.length) {
      setError('Invalid number of teams.');
      return;
    }
    const formedTeams = distributePlayersBySkillAndPosition(players, numTeams);
    setTeams(formedTeams);
    setError('');
  };

  return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Team Formation Tool</h1>

        <div className="mb-4 flex flex-col md:flex-row">
          <div className={`w-full md:w-1/2 p-4 transition-all duration-300 ease-in-out ${activeTab === 'csv' ? 'md:w-full' : activeTab === 'manual' ? 'md:w-[60px]' : ''}`}>
            <button
                onClick={() => setActiveTab(activeTab === 'csv' ? null : 'csv')}
                className={`flex items-center justify-center w-full md:w-auto p-2 rounded ${activeTab === 'csv' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              <Upload className="mr-2" />
              <span className={activeTab === 'manual' ? 'hidden' : ''}>CSV Upload</span>
            </button>
            {(activeTab === 'csv' || activeTab === null) && (
                <div className="mt-4">
                  <CSVReader
                      onUploadAccepted={handleCSVUpload}
                      onUploadRejected={handleCSVError}
                      config={{
                        header: true,
                        dynamicTyping: true,
                        skipEmptyLines: true,
                      }}
                  >
                    {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }) => (
                        <>
                          <div {...getRootProps()} className="border-2 border-dashed border-gray-300 p-4 text-center cursor-pointer">
                            {acceptedFile ? (
                                <>
                                  <div>{acceptedFile.name}</div>
                                  <button {...getRemoveFileProps()} className="text-red-500 mt-2">
                                    Remove
                                  </button>
                                </>
                            ) : (
                                <span className="text-sm">Drop CSV file here or click to upload.</span>
                            )}
                          </div>
                          <ProgressBar />
                        </>
                    )}
                  </CSVReader>
                </div>
            )}
          </div>
          <div className={`w-full md:w-1/2 p-4 transition-all duration-300 ease-in-out ${activeTab === 'manual' ? 'md:w-full' : activeTab === 'csv' ? 'md:w-[60px]' : ''}`}>
            <button
                onClick={() => setActiveTab(activeTab === 'manual' ? null : 'manual')}
                className={`flex items-center justify-center w-full md:w-auto p-2 rounded ${activeTab === 'manual' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            >
              <Edit3 className="mr-2" />
              <span className={activeTab === 'csv' ? 'hidden' : ''}>Manual Input</span>
            </button>
            {(activeTab === 'manual' || activeTab === null) && (
                <div className="mt-4">
              <textarea
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  className="w-full p-2 border rounded h-64"
                  placeholder="Enter player data here (format: Full Name, Preferred Position, Skill Level)"
              />
                  <button
                      onClick={handleManualInput}
                      className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Process Manual Input
                  </button>
                </div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="numTeams" className="block text-sm font-medium text-gray-700">
            Number of Teams:
          </label>
          <input
              type="number"
              id="numTeams"
              value={numTeams}
              onChange={(e) => setNumTeams(parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              min="1"
          />
        </div>

        <button
            onClick={handleFormTeams}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Form Teams
        </button>

        {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {players.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Detected Skill Levels:</h3>
              <ul className="list-disc list-inside">
                {skillLevels.map((level, index) => (
                    <li key={index}>{level}</li>
                ))}
              </ul>
            </div>
        )}

        {teams.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Formed Teams</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teams.map((team, index) => (
                    <div key={index} className="border rounded p-4">
                      <h3 className="font-bold mb-2">Team {index + 1}</h3>
                      <ul>
                        {team.map((player, playerIndex) => (
                            <li key={playerIndex} className="mb-1">
                              {player['Full Name']} - {player['Preferred Position']} ({player['Skill Level']})
                            </li>
                        ))}
                      </ul>
                    </div>
                ))}
              </div>
            </div>
        )}
      </div>
  );
};

export default TeamFormationTool;