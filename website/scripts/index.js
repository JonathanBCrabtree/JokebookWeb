$('document').ready(() => {
    setNewJoke()
})

$('#joke-next').click(() => {
    setNewJoke()
});

$('#joke-answer').click(() => {
    answerJoke()
});

let setNewJoke = async () => {
    let nextButton = $('#joke-next')
    let setup = $('#setup')
    let answerButton = $('#joke-answer')
    let punchline = $('#punchline')
    let errorMsg = $('#error')

    nextButton.prop('disabled', true);
    errorMsg.prop('hidden', true);
    setup.prop("hidden", false);
    answerButton.prop('disabled', true);
    answerButton.prop('hidden', false);
    punchline.prop("hidden", true);



    let joke = await getJokeFromServer();
    let success = joke['success']
    nextButton.prop('disabled', false);

    if (success) {
        setup.text(joke['joke']['setup']);
        answerButton.prop('disabled', false);

        punchline.text(joke['joke']['punchline']);
    } else {
        errorMsg.prop('hidden', false);
        setup.prop("hidden", true);
    }
}

let answerJoke = () => {
    $('#joke-answer').prop('hidden', true)
    $('#punchline').prop('hidden', false)
}

let getJokeFromServer = async () => {
    let result = {}

    try {
        await $.ajax({
            url: `http://localhost:3000`,
            type: 'GET',
            dataType: 'json',
            success: (response) => {

                result['success'] = true;
                result['joke'] = response[0];
            },
            error: (error) => {
                result['success'] = false
            }
        });
    } catch (error) {
        result['success'] = false
    }


    return result;
}
