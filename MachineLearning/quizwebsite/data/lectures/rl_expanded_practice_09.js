export default (direct) => [
  direct(
    "rle_09_01",
    "easy",
    "Conditioning and RL",
    "Which pairing matches the lecture's distinction between prediction and control?",
    [
      "Classical conditioning aligns with policy evaluation; instrumental conditioning aligns with policy improvement",
      "Classical conditioning aligns with policy improvement; instrumental conditioning aligns with policy evaluation",
      "Classical conditioning aligns with transition learning; instrumental conditioning aligns with state estimation",
      "Classical conditioning aligns with reward shaping; instrumental conditioning aligns with imitation learning",
    ],
    0,
    "The lecture treats classical conditioning as a prediction problem analogous to policy evaluation, while instrumental conditioning changes action selection based on consequences and therefore corresponds to control or policy improvement."
  ),
  direct(
    "rle_09_02",
    "easy",
    "Temporal credit assignment",
    "A bell precedes food by several moments but still becomes conditioned. What mechanism best accounts for credit reaching the earlier bell?",
    [
      "A persistent cue value updated only at the instant food arrives",
      "A decaying stimulus trace, analogous to an eligibility trace",
      "A model-based backup that credits every earlier stimulus equally",
      "A larger learning rate applied only when the delayed food appears",
    ],
    1,
    "Psychology describes a fading memory of preceding stimuli as a stimulus trace. The lecture links this to n-step methods and, more precisely, eligibility traces with exponential decay."
  ),
  direct(
    "rle_09_03",
    "easy",
    "Extinction",
    "A mouse learned to press a lever for food. The food is then removed, with no punishment introduced. What does extinction predict?",
    [
      "The pressing rate stays fixed because the new reward equals zero",
      "The pressing rate immediately reverses into active lever avoidance",
      "The pressing response gradually weakens across unrewarded trials",
      "The pressing response grows because the expected food remains positive",
    ],
    2,
    "Extinction is the gradual loss of a conditioned response after its expected reward is removed. It occurs without punishment, which exposes the weakness of a reward-only update rule."
  ),
  direct(
    "rle_09_04",
    "easy",
    "Rescorla-Wagner model",
    "An animal expects reward value 4 and receives reward value 4. Under Rescorla-Wagner, what learning signal remains?",
    [
      "A positive signal because any received reward reinforces the response",
      "A negative signal because the prediction must be discounted first",
      "A variable signal determined only by how often the cue occurred",
      "A zero signal because the received and expected rewards coincide",
    ],
    3,
    "Rescorla-Wagner learns from r - V rather than reward alone. When r and V are both 4, the prediction error is zero and there is nothing new to learn."
  ),
  direct(
    "rle_09_05",
    "medium",
    "Rescorla-Wagner model",
    "Why can Rescorla-Wagner explain both saturation during acquisition and extinction after reward removal?",
    [
      "Its update shrinks when reward matches expectation and becomes negative when an expected reward is omitted",
      "Its learning rate decays near saturation and rises again whenever an expected reward is omitted",
      "It averages rewarded trials during acquisition and resets value to zero after the first omission",
      "It clips expectation at the reward during acquisition and negates stored rewards during extinction",
    ],
    0,
    "As V approaches r, r - V approaches zero, producing saturation. If reward is then removed while V remains positive, r - V is negative and drives the learned response down."
  ),
  direct(
    "rle_09_06",
    "medium",
    "Secondary reinforcement",
    "After a clicker has been paired with food, a dog learns a new paw-giving action followed only by the clicker. Why is this difficult for plain Rescorla-Wagner but natural for TD learning?",
    [
      "TD replaces the clicker with a reconstructed immediate food reward during each action-value update",
      "TD bootstraps from the clicker's positive next-state value even when immediate reward is zero",
      "TD treats every familiar cue as punishment until a new action has been learned",
      "TD ignores the next state and updates exclusively from the dog's current action",
    ],
    1,
    "In the new task r = 0, but the clicker state already has V(s') > 0. The TD error r + V(s') - V(s) can therefore be positive, allowing the clicker to function as a secondary reinforcer."
  ),
  direct(
    "rle_09_07",
    "medium",
    "Cognitive maps",
    "A rat trained in a maze immediately selects a good new route after the familiar path is blocked. What does the lecture infer from this result?",
    [
      "The rat has memorized a separate stimulus-response rule for every possible blockade",
      "The blockade makes the old path's cached action value increase before any new trial",
      "The rat has learned environmental transitions that support rapid replanning",
      "The rat abandons reward-directed behavior and explores with a random policy",
    ],
    2,
    "Immediate rerouting is hard to explain with only a reactive state-to-action mapping. A learned cognitive map corresponds to an MDP transition model, enabling model-based replanning."
  ),
  direct(
    "rle_09_08",
    "medium",
    "Outcome devaluation",
    "After training, an experimenter devalues the food by satiating the animal. Which response most strongly indicates goal-directed rather than habitual control?",
    [
      "The animal performs the trained action at the same rate despite satiation",
      "The animal performs the action faster because familiar outcomes require less planning",
      "The animal switches randomly between actions while preserving the same response rate",
      "The animal promptly reduces the action because the planned outcome has lost value",
    ],
    3,
    "Outcome devaluation distinguishes the systems: goal-directed, model-based behavior changes promptly when the outcome loses value, whereas habitual, model-free responding is relatively insensitive."
  ),
  direct(
    "rle_09_09",
    "hard",
    "Behaviorism and cognitivism",
    "Which claim best captures the lecture's warning about calling computational RL purely behaviorist?",
    [
      "RL includes reactive model-free mappings and structured model-based processes, so it spans both traditions",
      "RL rejects stimulus-response learning because every useful agent must learn an explicit transition model of its environment",
      "RL is cognitivist only when rewards are hidden and behaviorist only when rewards are observed",
      "RL becomes behaviorist during training but necessarily becomes cognitivist during evaluation",
    ],
    0,
    "The lecture maps reactive stimulus-to-response learning to model-free RL and structured transition knowledge to model-based RL. Computational RL is broad enough to combine both."
  ),
  direct(
    "rle_09_10",
    "easy",
    "Neural signalling",
    "According to the lecture's simplified neuron model, what primarily determines how activity flows from sensory input toward action output?",
    [
      "Neuron activation thresholds alone, with all connection weights treated as equal",
      "The strengths and excitatory or inhibitory effects of neural connections",
      "A global dopamine level that scales every synapse by the same signed amount",
      "The ordering of sensory neurons, independent of synaptic sign and magnitude",
    ],
    1,
    "Neural connections stimulate or inhibit subsequent neurons with differing strengths. Those connection strengths shape how observations are transformed into actions."
  ),
  direct(
    "rle_09_11",
    "medium",
    "Dopamine response",
    "Before any predictive cue has been learned, what response follows an unexpected rewarding stimulus in the lecture's dopamine-neuron trace?",
    [
      "A sustained firing decrease that remains below baseline",
      "No change until a predictor is introduced on later trials",
      "A brief phasic burst followed by a return to background activity",
      "A permanent elevation of the neuron's background firing rate after the reward is consumed",
    ],
    2,
    "An initially unexpected reward produces a phasic burst of dopamine-neuron activity, after which firing returns to its base rate. The response is not permanently elevated."
  ),
  direct(
    "rle_09_12",
    "medium",
    "Conditioned dopamine response",
    "A light repeatedly predicts reward. Once learning is established, where should the main phasic dopamine response occur?",
    [
      "At the reward only, because dopamine directly encodes the pleasure generated by its consumption",
      "Halfway between cue and reward, independent of either event",
      "At both events with equal bursts because both now have value",
      "At the light, with little or no burst at the fully expected reward",
    ],
    3,
    "With learning, the burst shifts from the reward to its earliest reliable predictor. A fully expected reward creates little prediction error, so its former burst disappears."
  ),
  direct(
    "rle_09_13",
    "easy",
    "Temporal-difference error",
    "At a transition, V(s) = 4, immediate reward is 2, and V(s') = 3, with no discounting in the lecture's example. What TD signal results?",
    [
      "+1, because the updated target 2 + 3 exceeds the previous expectation 4",
      "-1, because the immediate reward 2 is smaller than the previous expectation 4",
      "+5, because reward and next-state value are added without subtracting V(s)",
      "0, because the transition ends with a positive value in the next state",
    ],
    0,
    "The TD error is r + V(s') - V(s) = 2 + 3 - 4 = +1. Comparing immediate reward alone with V(s) would omit the bootstrap term."
  ),
  direct(
    "rle_09_14",
    "hard",
    "Reward-prediction error",
    "A well-trained cue predicts a reward, but the expected reward is omitted. Which combination matches both TD theory and the observed dopamine pattern?",
    [
      "Positive TD error and a burst at the time the reward should have arrived",
      "Negative TD error and a dip below baseline at the expected reward time",
      "Zero TD error and unchanged firing because no reward was delivered",
      "Negative TD error and a burst immediately before the predictive cue",
    ],
    1,
    "At the omitted reward, r = 0 and the successor value is zero while the current expectation remains positive. This produces a negative TD error, mirrored by a dopamine dip below baseline."
  ),
  direct(
    "rle_09_15",
    "hard",
    "Conditioned dopamine response",
    "A second cue is trained to predict an already conditioned light, which itself predicts reward. What pattern does the lecture report after learning?",
    [
      "The burst remains locked to reward because second-order cues cannot acquire predictive value",
      "The light and reward evoke equal bursts, while the new cue evokes only inhibition",
      "The burst shifts farther back to the new predictor, usually with some intensity decay",
      "All phasic responses vanish because two predictors make the total TD error exactly zero",
    ],
    2,
    "In higher-order conditioning, the response can shift from reward to its predictor and then to a predictor of that predictor. The lecture notes some decay in burst intensity."
  ),
  direct(
    "rle_09_16",
    "hard",
    "Blocking",
    "First, a sound is trained until it fully predicts reward. Then sound and light are presented together before the same reward. Why is learning about the light weak?",
    [
      "The light is treated as an inhibitor because it occurs closer to reward than the sound",
      "The trained sound suppresses the light representation before a new association can form",
      "Learning is divided equally between both cues, leaving the light with half the usual association",
      "The sound already makes reward expected, leaving near-zero prediction error for the light",
    ],
    3,
    "This is blocking. Once the sound fully predicts reward, the compound produces little or no TD error, so there is almost no learning signal with which to condition the newly added light."
  ),
  direct(
    "rle_09_17",
    "medium",
    "Classical conditioning",
    "In Pavlovian conditioning, the bell becomes a conditioned stimulus after repeated bell-food pairings. What has the bell principally acquired?",
    [
      "Predictive value for the food, allowing it to elicit a conditioned response",
      "The ability to choose among actions by comparing their long-run returns",
      "A negative association that suppresses responding until food is visible",
      "A transition rule that guarantees food appears reliably whenever the conditioned saliva response is produced",
    ],
    0,
    "The initially neutral bell becomes predictive of the unconditioned stimulus and elicits the conditioned response. This is why the lecture associates classical conditioning with prediction."
  ),
  direct(
    "rle_09_18",
    "medium",
    "Instrumental conditioning",
    "A mouse learns to press under a green light and withhold pressing under a red light because the consequences differ. What feature makes this a control problem?",
    [
      "The lights predict outcomes even if the mouse has no available action",
      "Consequences change which action the mouse selects in each state",
      "The reward is estimated without modifying the animal's behavior",
      "The mouse learns only a sensory representation of red and green",
    ],
    1,
    "Instrumental conditioning changes behavior as a function of its consequences. Selecting different actions under the two lights is policy improvement, which makes it a control problem."
  ),
  direct(
    "rle_09_19",
    "hard",
    "Model-free and model-based control",
    "Which outcome-devaluation result is the strongest evidence that both model-free and model-based systems can contribute to animal behavior?",
    [
      "Every trained response disappears after devaluation, regardless of training history",
      "No trained response changes after devaluation, even when the outcome is aversive",
      "Some well-practiced responses persist while goal-directed responses adjust immediately",
      "Response rates change only after the animal relearns the full transition model from scratch",
    ],
    2,
    "Persistence after devaluation is characteristic of habitual, model-free control, while immediate sensitivity is characteristic of goal-directed, model-based control. Observing both patterns supports two contributing systems."
  ),
  direct(
    "rle_09_20",
    "hard",
    "Prediction-error models",
    "Which observation separates a prediction-error account from a simple rule that strengthens behavior whenever reward is positive?",
    [
      "A larger reward produces a larger response on the very first rewarded trial before an expectation has formed",
      "A neutral cue produces no response before it has ever accompanied reward",
      "Repeated rewarded trials increase responding during early acquisition",
      "Learning saturates once reward is expected, and omission then weakens the response",
    ],
    3,
    "A reward-only rule predicts continued strengthening whenever r > 0 and no change when r = 0. Saturation and extinction instead require comparison with expectation, as in Rescorla-Wagner and TD learning."
  ),
];
