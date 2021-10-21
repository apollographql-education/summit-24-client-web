import PropTypes from 'prop-types';
import React, {useState} from 'react';
import intersection from 'lodash/intersection';
import isEqual from 'lodash/isEqual';
import union from 'lodash/union';
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Textarea
} from '@chakra-ui/react';
import {gql, useMutation, useQuery} from '@apollo/client';
import {useHistory} from 'react-router-dom';

export const SUBMIT_LISTING = gql`
  mutation UpdateListingMutation(
    $listingId: ID!
    $listing: UpdateListingInput!
  ) {
    updateListing(listingId: $listingId, listing: $listing) {
      success
      message
      listing {
        id
        title
        description
        photoThumbnail
        numOfBeds
        costPerNight
        locationType
        amenities {
          id
          category
          name
        }
      }
    }
  }
`;

export const AMENITIES = gql`
  query getAllAmenities {
    listingAmenities {
      id
      category
      name
    }
  }
`;

export default function ListingForm({
  listingId,
  listingData = {
    title: '',
    description: '',
    numOfBeds: 1,
    locationType: '',
    photoThumbnail: '',
    amenities: [],
    costPerNight: 100
  }
}) {
  const {loading, error, data} = useQuery(AMENITIES);

  if (loading) return 'Loading...';
  if (error) return `uhoh error! ${error.message}`;

  return (
    <ListingFormBody
      listingId={listingId}
      listingData={listingData}
      amenities={data?.listingAmenities}
    />
  );
}

ListingForm.propTypes = {
  listingData: PropTypes.object,
  listingId: PropTypes.string.isRequired
};

function ListingFormBody({listingData, amenities, listingId}) {
  const history = useHistory();
  const listingAmenities = listingData.amenities.map(amenity => amenity.id);
  const allAmenities = amenities.reduce((acc, curr) => {
    if (!acc[curr.category]) {
      acc[curr.category] = [curr];
    } else {
      acc[curr.category].push(curr);
    }

    return acc;
  }, {});

  const [formValues, setFormValues] = useState({
    ...listingData,
    amenities: listingAmenities
  });

  const [submitListing] = useMutation(SUBMIT_LISTING, {
    variables: {
      listingId,
      listing: formValues
    }
  });

  const handleNumInputChange = (newVal, name) => {
    setFormValues({...formValues, [name]: Number(newVal)});
  };

  const handleChange = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setFormValues({...formValues, [e.target.name]: value});
  };

  const handleAmenitiesChange = (e, allAmenitiesInCategory) => {
    if (e.target.type === 'checkbox') {
      if (e.target.name.includes('select-all')) {
        setFormValues(prevState => {
          return {
            ...prevState,
            amenities: union(prevState.amenities, allAmenitiesInCategory) // union merges and deduplicates arrays
          };
        });
      } else {
        if (e.target.checked) {
          setFormValues({
            ...formValues,
            amenities: [...formValues.amenities, e.target.name]
          });
        } else {
          setFormValues(prevState => {
            let updatedAmenities = [...prevState.amenities];
            const indexToRemove = prevState.amenities.indexOf(e.target.name);

            if (indexToRemove > -1) {
              updatedAmenities = prevState.amenities
                .slice(0, indexToRemove)
                .concat(
                  prevState.amenities.slice(
                    indexToRemove + 1,
                    prevState.amenities.length
                  )
                );
            }

            return {...formValues, amenities: updatedAmenities};
          });
        }
      }
    }
  };
  return (
    <Stack as="form" spacing="8" mb="4">
      <FormControl as="fieldset">
        <FormLabel as="legend" textTransform="uppercase">
          General Information
        </FormLabel>

        <FormLabel htmlFor="title">Title</FormLabel>
        <Input
          type="text"
          name="title"
          placeholder="Location name"
          value={formValues.title}
          onChange={handleChange}
        />

        <FormLabel htmlFor="description">Description</FormLabel>
        <Textarea
          name="description"
          placeholder="Describe your location"
          value={formValues.description}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl as="fieldset">
        <Stack spacing="4">
          <FormLabel as="legend" textTransform="uppercase">
            Location Details
          </FormLabel>
          <HStack spacing="8">
            <Stack>
              <FormLabel htmlFor="locationType">Type</FormLabel>
              <Select
                name="locationType"
                placeholder="Select option"
                value={formValues.locationType}
                onChange={handleChange}
              >
                <option value="APARTMENT">Apartment</option>
                <option value="CAMPSITE">Campsite</option>
                <option value="HOUSE">House</option>
                <option value="ROOM">Room</option>
                <option value="SPACESHIP">Spaceship</option>
              </Select>
            </Stack>
            <Stack maxW="146px">
              <FormLabel htmlFor="numOfBeds">Bedrooms</FormLabel>
              <NumberInput
                name="numOfBeds"
                defaultValue={2}
                min={1}
                value={formValues.numOfBeds}
                onChange={newVal => handleNumInputChange(newVal, 'numOfBeds')}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Stack>
          </HStack>

          <Stack maxW="146px">
            <FormLabel htmlFor="costPerNight">Cost per night</FormLabel>
            <InputGroup>
              <InputLeftAddon bg="transparent" paddingRight="0">
                $
              </InputLeftAddon>
              <NumberInput
                name="costPerNight"
                min={1}
                value={formValues.costPerNight}
                onChange={newVal =>
                  handleNumInputChange(newVal, 'costPerNight')
                }
              >
                <NumberInputField
                  borderLeftWidth="0"
                  borderTopLeftRadius="0"
                  borderBottomLeftRadius="0"
                />
              </NumberInput>
            </InputGroup>
          </Stack>

          <Stack>
            <FormLabel htmlFor="photoThumbnail">Image</FormLabel>
            <Input
              name="photoThumbnail"
              type="text"
              placeholder="Image URL"
              value={formValues.photoThumbnail}
              onChange={handleChange}
            />
          </Stack>
        </Stack>
      </FormControl>

      <FormControl as="fieldset">
        <Stack spacing="4">
          <FormLabel as="legend" textTransform="uppercase">
            Amenities
          </FormLabel>

          {Object.entries(allAmenities).map(([key, val]) => (
            <AmenitiesSelection
              key={key}
              category={key}
              amenities={val}
              allAmenities={allAmenities}
              onChange={handleAmenitiesChange}
              formValues={formValues.amenities}
            />
          ))}
        </Stack>
      </FormControl>

      <Flex w="full" justifyContent="flex-end">
        <Button
          type="submit"
          onClick={e => {
            e.preventDefault();
            submitListing();
            history.push(`/listing/${listingId}`);
          }}
          colorScheme="blue"
        >
          Publish listing
        </Button>
      </Flex>
    </Stack>
  );
}

ListingFormBody.propTypes = {
  listingData: PropTypes.object,
  amenities: PropTypes.array,
  listingId: PropTypes.string.isRequired
};

function AmenitiesSelection({
  formValues,
  category,
  amenities,
  allAmenities,
  onChange
}) {
  // example value for `category` -- 'ACCOMMODATION_DETAILS'
  const title = category
    .replace(/_/g, ' ')
    .toLowerCase()
    .split(' ') // capitalize first letter of each word
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');

  const allAmenitiesInCategory = allAmenities[category].map(
    amenity => amenity.id
  );
  const overlappingAmenities = intersection(allAmenitiesInCategory, formValues);
  return (
    <Stack>
      <HStack mb="2">
        <FormLabel mb="0">{title}</FormLabel>
        <Checkbox
          name={`${category}-select-all`}
          isChecked={isEqual(overlappingAmenities, allAmenitiesInCategory)}
          onChange={e => onChange(e, allAmenitiesInCategory)}
        >
          Select all
        </Checkbox>
      </HStack>
      <CheckboxGroup>
        <Grid templateColumns="repeat(3, 1fr)" gap="4">
          {amenities.map(({id, name}) => {
            const isChecked = formValues.includes(id);
            return (
              <Checkbox
                key={id}
                isChecked={isChecked}
                name={id}
                onChange={e => onChange(e, allAmenitiesInCategory)}
              >
                {name}
              </Checkbox>
            );
          })}
        </Grid>
      </CheckboxGroup>
    </Stack>
  );
}

AmenitiesSelection.propTypes = {
  category: PropTypes.string,
  amenities: PropTypes.array,
  formValues: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  allAmenities: PropTypes.object
};
