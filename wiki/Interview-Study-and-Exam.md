# Interview, Study and Exam Modes

![DeployVault timed interview mode](https://raw.githubusercontent.com/iamrichmack111/deploy-vault/main/media/interview-mode.png)

DeployVault separates deliberate investigation from retrieval practice and assessment. The same incident bank supports all three learning styles.

## Interview mode

Interview mode provides a ninety-second timer and a clean answer area. The prompt describes a production symptom. Respond as if speaking to an interviewer or incident commander.

An effective ninety-second allocation is:

| Time | Focus |
|---:|---|
| 0–15 seconds | Clarify impact, scope, namespace, timing, and recent changes |
| 15–45 seconds | Name commands and the evidence expected from each |
| 45–65 seconds | Identify likely causes and how to distinguish them |
| 65–80 seconds | Give remediation, rollback, and verification |
| 80–90 seconds | Add prevention and monitoring |

Browser speech recognition can place spoken words in the response field when the browser supports the Web Speech API and microphone permission is granted. Typing always remains available. DeployVault does not upload microphone audio.

**Grade Answer** applies the normal five-part rubric. **Reveal** displays a strong answer and subtracts twenty points.

## Study mode

Study mode uses a simple spaced-repetition loop:

1. Read the scenario and mentally construct the response.
2. Reveal the diagnosis and remediation.
3. Rate recall as Hard, Good, or Easy.

Hard increases the incident's future practice weight. Easy marks strong mastery and saves a high score. Use Hard when the answer only felt familiar after reveal; use Easy when the root cause, commands, and safe fix were available before reveal.

## Exam mode

Exam mode selects ten incidents randomly. Each incident has a sixty-second timer and no hints. Submitting a response advances automatically to the next question. At completion, DeployVault reports the average and a pass or continued-training result.

Recommended exam conditions:

- close notes and external references;
- speak or type the entire response;
- include exact commands;
- do not restart a scenario after seeing it;
- review category weaknesses only after the exam is complete.

## Suggested preparation cycle

```text
Lab: learn the investigation
  ↓
Study: retain the diagnosis
  ↓
Interview: communicate the response
  ↓
Exam: test transfer across categories
  ↓
Dashboard: choose the next weak area
```

For interview practice, prioritize clarity over command volume. Three relevant commands with an explanation are stronger than ten unrelated commands.

