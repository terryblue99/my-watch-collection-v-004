import _ from 'lodash'
import {
	CLEAR_WATCHES,
	COST_HIGH_TO_LOW_SORT,
	COST_LOW_TO_HIGH_SORT,
	DELETE_WATCH,
	GET_WATCHES, 
	NEWEST_TO_OLDEST_SORT,
	OLDEST_TO_NEWEST_SORT,
	NEWEST_TO_OLDEST_WORN_SORT,
	OLDEST_TO_NEWEST_WORN_SORT,
	RESET_TOTAL_COST,
	RESET_SEARCH_FAILED,
	RESET_SORT,
	RESET_WATCHES,
	SEARCH_WATCHES,
	WATCH_MAKER_SORT,
	WATCH_NAME_SORT,
	WATCH_RELATED
} from '../actions/types'

const initialState = {
	watches: [],
	savedWatches: [],
	savedWatchRelated: [],
	watchRelated: 'Watch-Related', // For records that are not related to a specific watch.
	sortDefaultText: 'Select a sort option for watches...',
	totalCost: parseFloat(0),
	savedTotalCost: parseFloat(0),
	isSearchResultRelated: false,
	isSearchFailed: false,
	isSort: false,
	isWatchRelatedDisplayed: false
}
let sortedWatches

// Used when sorting watches by cost,
// converting it to a floating point number
const costToNumber = (watch) => {
	if (watch.cost) {
		return parseFloat(watch.cost)
	} else return 0.00
}

export default (state = initialState, { type, payload } ) => {

	switch(type) {

		// UPDATE WATCHES & WATCH-RELATED

		case GET_WATCHES:
			if (payload) {
				const watchesData = payload.sortedWatchData.filter(watch => watch.watch_maker !== state.watchRelated)
				const relatedData = payload.sortedWatchData.filter(watch => watch.watch_maker === state.watchRelated)
				return ({
					...state,
					WatchRelated: state.WatchRelated,
					isSearchResultRelated: false,
					isSearchFailed: false,
					watches: watchesData,
					savedWatches: watchesData,
					savedWatchRelated: relatedData,
					totalCost: payload.totalCost,
					savedTotalCost: payload.totalCost
				})
			} else return state

		case RESET_WATCHES:		
			return ({
				...state,
				watches: state.savedWatches,
				totalCost: state.savedTotalCost,
				isSearchResultRelated: false,
				isWatchRelatedDisplayed: false
			})

		case WATCH_RELATED:		
			return ({
				...state,
				watches: state.savedWatchRelated,
				isWatchRelatedDisplayed: true
			})

		case RESET_TOTAL_COST:		
			return ({
				...state,
				watches: state.savedWatches,
				totalCost: parseFloat(0)
			})

		case RESET_SEARCH_FAILED:
			return ({
				...state,
				isSearchFailed: false
			})

		case DELETE_WATCH:
			if (payload) {
				return ({
					...state,
					watches: state.watches.filter(watch => watch.id !== payload),
					savedWatches: state.savedWatches.filter(watch => watch.id !== payload),
					savedWatchRelated: state.savedWatchRelated.filter(watch => watch.id !== payload)
				})
			} else return state		

		case CLEAR_WATCHES:
				state = initialState
				return ({
					...state,
					totalCost: parseFloat(0)
				})

		// SEARCH WATCHES & WATCH-RELATED

		case SEARCH_WATCHES:

			if (payload === null) {
				alert('Please enter a search value!')
				return ({
					...state,
					watches: state.savedWatches,
					totalCost: state.savedTotalCost
				})
			}

			let watchArray
			let searchText

			if (payload !== null) {
				searchText = payload.toLowerCase()
			}

			let watchesSearchData
			let relatedFound = false
			if (state.savedWatchRelated.length === 0) {
				watchesSearchData = state.savedWatches
			} else {
				watchesSearchData = state.savedWatches.concat(state.savedWatchRelated)
			}

			const searchArray = watchesSearchData.filter(watch => {

				watchArray = []
				if (watch.date_last_worn === null) {
					watch.date_last_worn = ''
				}
				if (watch.date_bought === null) {
					watch.date_bought = ''
				}
				watchArray.push( watch.watch_maker.toLowerCase(),
												 watch.watch_name.toLowerCase(),
												 watch.movement.toLowerCase(),
												 watch.complications.toLowerCase(),
												 watch.band.toLowerCase(),
												 watch.model_number.toLowerCase(),
												 watch.case_measurement.toLowerCase(),
												 watch.water_resistance.toLowerCase(),
												 watch.date_bought,
												 watch.date_last_worn,
												 watch.cost,
												 watch.notes.toLowerCase()
												)
				// check array of record string fields for searchText string/substring
				return watchArray.some(watchStringField => watchStringField.includes(searchText))
			})
			
			// Accumulate the total cost of all watches
			const totalCost = searchArray.reduce((total, cost, index, array) => {
				total += parseFloat(array[index].cost)
				return total
			}, 0)

			if (searchArray.some(item => item.watch_maker === state.watchRelated)) {
				relatedFound = state.watchRelated
			}

			return ({
				...state,
				watches: searchArray,
				totalCost: totalCost,
				isSearchResultRelated: relatedFound
			})
		
		// SORT WATCHES & WATCH-RELATED

		case WATCH_MAKER_SORT: // sort by name within maker
			sortedWatches = _.chain( state.watches )
			.sortBy('watch_name')
			.sortBy('watch_maker')
			.value()
			return ({
				...state,
				isSort: true,
				watches: sortedWatches
			})
	
		case WATCH_NAME_SORT:
			sortedWatches = _.sortBy( state.watches, 'watch_name' )
			return ({
				...state,
				isSort: true,
				watches: sortedWatches
			})

		case	NEWEST_TO_OLDEST_SORT:
			sortedWatches = _.sortBy( state.watches, 'date_bought' )
			return ({
				...state,
				isSort: true,
				watches: sortedWatches.reverse()
			})

		case	OLDEST_TO_NEWEST_SORT:
			sortedWatches = _.sortBy( state.watches, 'date_bought' )
			return ({
				...state,
				isSort: true,
				watches: sortedWatches
			})

		case	NEWEST_TO_OLDEST_WORN_SORT:
			sortedWatches = _.sortBy( state.watches, 'date_last_worn' )
			return ({
				...state,
				isSort: true,
				watches: sortedWatches.reverse()
			})

		case	OLDEST_TO_NEWEST_WORN_SORT:
			sortedWatches = _.sortBy( state.watches, 'date_last_worn' )
			return ({
				...state,
				isSort: true,
				watches: sortedWatches
			})

		case	COST_LOW_TO_HIGH_SORT:
			sortedWatches = _.sortBy( state.watches, costToNumber )
			return ({
				...state,
				isSort: true,
				watches: sortedWatches
			})

		case	COST_HIGH_TO_LOW_SORT:
			sortedWatches = _.sortBy( state.watches, costToNumber)
			return ({
				...state,
				isSort: true,
				watches: sortedWatches.reverse()
			})

		case RESET_SORT:
			return ({
				...state,
				isSort: false
			})

		// DEFAULT STATE

		default:
			return state
	}
}