import React, {useCallback, useMemo, useState} from 'react';
import {useCSVReader} from 'react-papaparse';
import {AlertCircle, Moon, Sun} from 'lucide-react';
import {Alert, AlertDescription, AlertTitle} from './components/ui/alert';
import {Button} from './components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from './components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from './components/ui/tabs';
import {Input} from './components/ui/input';
import {Textarea} from './components/ui/textarea';
import {Switch} from './components/ui/switch';
import {Label} from './components/ui/label';

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const distributePlayersBySkillAndPosition = (players, numTeams) => {
    const teams = Array.from({length: numTeams}, () => []);
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

const isHeaderRow = (row) => {
    return row.some(cell =>
        typeof cell === 'string' &&
        ['full name', 'preferred position', 'skill level'].includes(cell.toLowerCase().trim())
    );
};

const skillLevelColors = {
    'Not that good': 'bg-red-200 dark:bg-red-800',
    'Decent': 'bg-yellow-200 dark:bg-yellow-800',
    'Good': 'bg-green-200 dark:bg-green-800',
    'Really Good': 'bg-blue-200 dark:bg-blue-800',
};

const TeamFormationTool = () => {
    const [players, setPlayers] = useState([]);
    const [numTeams, setNumTeams] = useState(2);
    const [teams, setTeams] = useState([]);
    const [error, setError] = useState('');
    const [manualInput, setManualInput] = useState('');
    const [activeTab, setActiveTab] = useState('manual');
    const [darkMode, setDarkMode] = useState(false);
    const {CSVReader} = useCSVReader();

    const skillLevels = useMemo(() =>
            [...new Set(players.map(player => player['Skill Level']))],
        [players]
    );

    const handleCSVUpload = useCallback((results) => {
        let parsedPlayers = results.data;

        if (isHeaderRow(parsedPlayers[0])) {
            parsedPlayers = parsedPlayers.slice(1);
        }

        parsedPlayers = parsedPlayers.map(row => ({
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

        const startIndex = isHeaderRow(lines[0].split(',')) ? 1 : 0;

        const parsedPlayers = lines.slice(startIndex).map(line => {
            const [fullName, preferredPosition, skillLevel] = line.split(',').map(item => item.trim());
            return {'Full Name': fullName, 'Preferred Position': preferredPosition, 'Skill Level': skillLevel};
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

    const sortedTeams = useMemo(() => {
        return teams.map(team =>
            [...team].sort((a, b) =>
                skillLevels.indexOf(b['Skill Level']) - skillLevels.indexOf(a['Skill Level'])
            )
        );
    }, [teams, skillLevels]);

    return (
        <div className={`container mx-auto p-4 ${darkMode ? 'dark' : ''}`}>

            <div className={`container mx-auto p-4 ${darkMode ? 'dark' : ''}`}>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Team Formation Tool</h1>
                    <div className="flex items-center space-x-2">
                        <Sun className="h-4 w-4"/>
                        <Switch
                            checked={darkMode}
                            onCheckedChange={setDarkMode}
                            id="dark-mode"
                        />
                        <Moon className="h-4 w-4"/>
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
                    <TabsList>
                        <TabsTrigger value="manual">Manual Input</TabsTrigger>
                        <TabsTrigger value="csv">CSV Upload</TabsTrigger>
                    </TabsList>
                    <TabsContent value="manual">
                        <Card>
                            <CardHeader>
                                <CardTitle>Manual Input</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Textarea
                                    value={manualInput}
                                    onChange={(e) => setManualInput(e.target.value)}
                                    placeholder="Enter player data here (format: Full Name, Preferred Position, Skill Level)"
                                    className="h-64"
                                />
                                <Button onClick={handleManualInput} className="mt-2">
                                    Process Manual Input
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="csv">
                        <Card>
                            <CardHeader>
                                <CardTitle>CSV Upload</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CSVReader
                                    onUploadAccepted={handleCSVUpload}
                                    onUploadRejected={handleCSVError}
                                    config={{
                                        header: false,
                                        dynamicTyping: true,
                                        skipEmptyLines: true,
                                    }}
                                >
                                    {({getRootProps, acceptedFile, ProgressBar, getRemoveFileProps}) => (
                                        <>
                                            <div
                                                {...getRootProps()}
                                                className="border-2 border-dashed border-gray-300 dark:border-gray-600 p-4 text-center cursor-pointer"
                                            >
                                                {acceptedFile ? (
                                                    <>
                                                        <div>{acceptedFile.name}</div>
                                                        <Button {...getRemoveFileProps()} variant="destructive"
                                                                className="mt-2">
                                                            Remove
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <span
                                                        className="text-sm">Drop CSV file here or click to upload.</span>
                                                )}
                                            </div>
                                            <ProgressBar/>
                                        </>
                                    )}
                                </CSVReader>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                <div className="mb-4">
                    <Label htmlFor="numTeams">Number of Teams:</Label>
                    <Input
                        type="number"
                        id="numTeams"
                        value={numTeams}
                        onChange={(e) => setNumTeams(parseInt(e.target.value))}
                        min="1"
                    />
                </div>

                <Button onClick={handleFormTeams}>
                    Form Teams
                </Button>

                {error && (
                    <Alert variant="destructive" className="mt-4">
                        <AlertCircle className="h-4 w-4"/>
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {players.length > 0 && (
                    <Card className="mt-4">
                        <CardHeader>
                            <CardTitle>Detected Skill Levels</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc list-inside">
                                {skillLevels.map((level, index) => (
                                    <li key={index}>{level}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                )}

                {sortedTeams.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-xl font-bold mb-4">Formed Teams</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {sortedTeams.map((team, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardTitle>Team {index + 1}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul>
                                            {team.map((player, playerIndex) => (
                                                <li key={playerIndex}
                                                    className={`mb-1 p-1 rounded ${skillLevelColors[player['Skill Level']]}`}>
                                                    {player['Full Name']} - {player['Preferred Position']} ({player['Skill Level']})
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeamFormationTool;