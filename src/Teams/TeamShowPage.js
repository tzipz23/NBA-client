import React from 'react'
import {Segment, Grid, Image, Loader} from 'semantic-ui-react'
import PlayerCards from './PlayerCards.js'



class TeamShowPage extends React.Component {

    render(){
        const {image} = this.props.team
        
        return(
        <div>
            
            <Grid relaxed='very' columns={6}>
                {this.props.team.players.map(player => {
                    return (
                        <Grid.Column centered>
                            <Segment style={{background: `url(${image})`}}>
                                <PlayerCards player={player} key={player.id} favoritePlayer={this.props.favs}/>
                            </Segment>
                        </Grid.Column>
                        
                    )   
                })}
                </Grid>
              
              <Grid.Row columns={2}>
                        {/* Second Table */}
                        <Grid.Column>
                            <h1>East Standings</h1>
                            <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">Team</th>
                                <th scope="col">Wins</th>
                                <th scope="col">Losses</th>
                                <th scope="col">Win Percentage</th>
                                <th scope="col">Divison Rank</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <th scope="row">Bucks</th>
                                <td>53</td>
                                <td>12</td>
                                <td>.815</td>
                                <td>1</td>
                                </tr>
                                <tr>
                                <th scope="row">Raptors</th>
                                <td>46</td>
                                <td>18</td>
                                <td>.719</td>
                                <td>2</td>
                                </tr>
                                <tr>
                                <th scope="row">Celtics</th>
                                <td>43</td>
                                <td>21</td>
                                <td>.672</td>
                                <td>3</td>
                                </tr>
                                <tr>
                                <th scope="row">Heat</th>
                                <td>41</td>
                                <td>24</td>
                                <td>.631</td>
                                <td>4</td>
                                </tr>
                                <tr>
                                <th scope="row">Pacers</th>
                                <td>39</td>
                                <td>26</td>
                                <td>.600</td>
                                <td>5</td>
                                </tr>
                                <tr>
                                <th scope="row">76ers</th>
                                <td>39</td>
                                <td>26</td>
                                <td>.600</td>
                                <td>6</td>
                                </tr>
                                <tr>
                                <th scope="row">Nets</th>
                                <td>30</td>
                                <td>34</td>
                                <td>.469</td>
                                <td>7</td>
                                </tr>
                                <tr>
                                <th scope="row">Magic</th>
                                <td>30</td>
                                <td>35</td>
                                <td>.462</td>
                                <td>8</td>
                                </tr>
                                <tr>
                                <th scope="row">Wizards</th>
                                <td>24</td>
                                <td>40</td>
                                <td>.375</td>
                                <td>9</td>
                                </tr>
                                <tr>
                                <th scope="row">Hornets</th>
                                <td>23</td>
                                <td>42</td>
                                <td>.354</td>
                                <td>10</td>
                                </tr>
                                <tr>
                                <th scope="row">Bulls</th>
                                <td>22</td>
                                <td>43</td>
                                <td>.338</td>
                                <td>11</td>
                                </tr>
                                <tr>
                                <th scope="row">Knicks</th>
                                <td>21</td>
                                <td>45</td>
                                <td>.318</td>
                                <td>12</td>
                                </tr>
                                <tr>
                                <th scope="row">Pistons</th>
                                <td>20</td>
                                <td>46</td>
                                <td>.303</td>
                                <td>13</td>
                                </tr>
                                <tr>
                                <th scope="row">Hawks</th>
                                <td>20</td>
                                <td>47</td>
                                <td>.299</td>
                                <td>14</td>
                                </tr>
                                <tr>
                                <th scope="row">Cavaliers</th>
                                <td>19</td>
                                <td>46</td>
                                <td>.292</td>
                                <td>15</td>
                                </tr>
                            </tbody>
                            </table>
                        </Grid.Column>
                        <Grid.Column>
                            <h1>West Standings</h1>
                            <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">Team</th>
                                <th scope="col">Wins</th>
                                <th scope="col">Losses</th>
                                <th scope="col">Win Percentage</th>
                                <th scope="col">Divison Rank</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <th scope="row">Lakers</th>
                                <td>49</td>
                                <td>14</td>
                                <td>.778</td>
                                <td>1</td>
                                </tr>
                                <tr>
                                <th scope="row">Clippers</th>
                                <td>44</td>
                                <td>20</td>
                                <td>.688</td>
                                <td>2</td>
                                </tr>
                                <tr>
                                <th scope="row">Nuggets</th>
                                <td>43</td>
                                <td>22</td>
                                <td>.662</td>
                                <td>3</td>
                                </tr>
                                <tr>
                                <th scope="row">Jazz</th>
                                <td>41</td>
                                <td>23</td>
                                <td>.641</td>
                                <td>4</td>
                                </tr>
                                <tr>
                                <th scope="row">Thunder</th>
                                <td>40</td>
                                <td>24</td>
                                <td>.625</td>
                                <td>5</td>
                                </tr>
                                <tr>
                                <th scope="row">Rockets</th>
                                <td>40</td>
                                <td>24</td>
                                <td>.625</td>
                                <td>6</td>
                                </tr>
                                <tr>
                                <th scope="row">Mavericks</th>
                                <td>40</td>
                                <td>27</td>
                                <td>.597</td>
                                <td>7</td>
                                </tr>
                                <tr>
                                <th scope="row">Grizzlies</th>
                                <td>32</td>
                                <td>33</td>
                                <td>.492</td>
                                <td>8</td>
                                </tr>
                                <tr>
                                <th scope="row">Blazers</th>
                                <td>29</td>
                                <td>37</td>
                                <td>.439</td>
                                <td>9</td>
                                </tr>
                                <tr>
                                <th scope="row">Pelicans</th>
                                <td>28</td>
                                <td>36</td>
                                <td>.438</td>
                                <td>10</td>
                                </tr>
                                <tr>
                                <th scope="row">Kings</th>
                                <td>28</td>
                                <td>36</td>
                                <td>.438</td>
                                <td>11</td>
                                </tr>
                                <tr>
                                <th scope="row">Spurs</th>
                                <td>27</td>
                                <td>36</td>
                                <td>.429</td>
                                <td>12</td>
                                </tr>
                                <tr>
                                <th scope="row">Suns</th>
                                <td>26</td>
                                <td>39</td>
                                <td>.400</td>
                                <td>13</td>
                                </tr>
                                <tr>
                                <th scope="row">Timberwolves</th>
                                <td>19</td>
                                <td>45</td>
                                <td>.297</td>
                                <td>14</td>
                                </tr>
                                <tr>
                                <th scope="row">Warriors</th>
                                <td>15</td>
                                <td>50</td>
                                <td>.231</td>
                                <td>15</td>
                                </tr>
                            </tbody>
                            </table>
                        </Grid.Column>
                    </Grid.Row>
               
           

        </div>
        )

    }

}

export default TeamShowPage