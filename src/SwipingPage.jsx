import React, { useState } from 'react';
import {
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Box,
} from '@mui/material';

const mockRestaurants = [
  { id: 1, name: 'Pizza Palace', genre: 'Italian', distance: 2, delivery: true, takeout: true, walkIn: true, reservation: false },
  { id: 2, name: 'Sushi Town', genre: 'Sushi', distance: 5, delivery: false, takeout: true, walkIn: true, reservation: true },
  { id: 3, name: 'Burger Joint', genre: 'Burgers', distance: 1, delivery: false, takeout: false, walkIn: true, reservation: false },
  { id: 4, name: 'El Mexicano', genre: 'Mexican', distance: 4, delivery: true, takeout: true, walkIn: false, reservation: true },
  { id: 5, name: 'Dim Sum House', genre: 'Chinese', distance: 6, delivery: false, takeout: true, walkIn: true, reservation: true },
];

function SwipingPage() {
  // State for the filter dialog
  const [openFilters, setOpenFilters] = useState(false);

  // Filter states
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [distance, setDistance] = useState(10); // e.g., 10 miles
  const [delivery, setDelivery] = useState(false);
  const [takeout, setTakeout] = useState(false);
  const [walkIn, setWalkIn] = useState(false);
  const [reservation, setReservation] = useState(false);

  // Restaurant display state
  const [restaurants, setRestaurants] = useState(mockRestaurants);
  const [currentIndex, setCurrentIndex] = useState(0); // simple index for "swiping"

  // Genres to choose from
  const allGenres = ['Italian', 'Sushi', 'Burgers', 'Mexican', 'Chinese'];

  // Handlers for opening/closing filters dialog
  const handleOpenFilters = () => setOpenFilters(true);
  const handleCloseFilters = () => setOpenFilters(false);

  // Apply filters
  const handleApplyFilters = () => {
    const filtered = mockRestaurants.filter((r) => {
      const matchGenre =
        selectedGenres.length === 0 || selectedGenres.includes(r.genre);
      const matchDistance = r.distance <= distance;
      const matchDelivery = !delivery || r.delivery;
      const matchTakeout = !takeout || r.takeout;
      const matchWalkIn = !walkIn || r.walkIn;
      const matchReservation = !reservation || r.reservation;

      return (
        matchGenre &&
        matchDistance &&
        matchDelivery &&
        matchTakeout &&
        matchWalkIn &&
        matchReservation
      );
    });

    setRestaurants(filtered);
    setCurrentIndex(0);
    setOpenFilters(false);
  };

  // Swiping logic placeholders
  const handleYes = () => {
    console.log('User said YES to:', restaurants[currentIndex]?.name);
    setCurrentIndex((prev) => Math.min(prev + 1, restaurants.length - 1));
  };

  const handleNo = () => {
    console.log('User said NO to:', restaurants[currentIndex]?.name);
    setCurrentIndex((prev) => Math.min(prev + 1, restaurants.length - 1));
  };

  // Handle genre checkbox
  const handleGenreChange = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: 4,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Swipe / Decide
      </Typography>

      {/* FILTERS BUTTON */}
      <Button variant="outlined" onClick={handleOpenFilters} sx={{ mb: 2 }}>
        Open Filters
      </Button>

      {/* SWIPING CARD AREA */}
      {restaurants.length > 0 && currentIndex < restaurants.length ? (
        <Paper
          elevation={3}
          sx={{
            width: '600px',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
            p: 2,
          }}
        >
          <Typography variant="h5">
            {restaurants[currentIndex].name} ({restaurants[currentIndex].genre})
          </Typography>
        </Paper>
      ) : (
        <Typography variant="h6" sx={{ mb: 2 }}>
          No more restaurants match your filters!
        </Typography>
      )}

      {/* SWIPING BUTTONS */}
      {restaurants.length > 0 && currentIndex < restaurants.length && (
        <Box sx={{ display: 'flex', gap: '1rem', mb: 2 }}>
          <Button variant="outlined" color="error" onClick={handleNo}>
            No
          </Button>
          <Button variant="contained" color="primary" onClick={handleYes}>
            Yes
          </Button>
        </Box>
      )}

      {/* FILTERS DIALOG */}
      <Dialog open={openFilters} onClose={handleCloseFilters} maxWidth="sm" fullWidth>
        <DialogTitle>Set Your Filters</DialogTitle>
        <DialogContent dividers>
          {/* GENRES CHECKBOXES */}
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Select Genres:
          </Typography>
          <FormGroup row>
            {allGenres.map((genre) => (
              <FormControlLabel
                key={genre}
                control={
                  <Checkbox
                    checked={selectedGenres.includes(genre)}
                    onChange={() => handleGenreChange(genre)}
                  />
                }
                label={genre}
              />
            ))}
          </FormGroup>

          {/* DISTANCE SLIDER */}
          <Typography variant="subtitle1" sx={{ mt: 3 }}>
            Max Distance (miles):
          </Typography>
          <Slider
            value={distance}
            onChange={(_, newValue) => setDistance(newValue)}
            step={1}
            min={0}
            max={30}
            valueLabelDisplay="auto"
          />

          {/* CHECKBOXES FOR DELIVERY, TAKEOUT, WALK-IN, RESERVATION */}
          <Typography variant="subtitle1" sx={{ mt: 3 }}>
            Additional Options:
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={delivery}
                  onChange={() => setDelivery(!delivery)}
                />
              }
              label="Delivery"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={takeout}
                  onChange={() => setTakeout(!takeout)}
                />
              }
              label="Takeout"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={walkIn}
                  onChange={() => setWalkIn(!walkIn)}
                />
              }
              label="Walk-in"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={reservation}
                  onChange={() => setReservation(!reservation)}
                />
              }
              label="Reservation"
            />
          </FormGroup>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseFilters} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleApplyFilters} variant="contained" color="primary">
            Apply Filters
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default SwipingPage;
