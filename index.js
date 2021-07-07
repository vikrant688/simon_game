var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var count=0;
function animationPress(currentColour)
{
    $("."+currentColour).addClass("pressed");
    setTimeout(function()
    {
        $("."+currentColour).removeClass("pressed");
    },100);
}
function playsound(name)
{
    var x=new Audio("sounds/"+name+".mp3");
    x.play();
}
function nextSequence()
{
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);
    $("h1").text("Level "+count);
    count++;
}

$(".btn").on("click",function()
{
    if(count>0)
    {
    var userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);
    
    if(userClickedPattern[userClickedPattern.length-1]!==gamePattern[userClickedPattern.length-1])
    {
        
        count=0;
        $("h1").text("Game Over, Press A Key to Restart");
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function()
        {
            $("body").removeClass("game-over");
        },200);
        while(gamePattern.length!==0)
        {
            gamePattern.pop();
        }
        while(userClickedPattern.length!==0)
        {
            userClickedPattern.pop();
        }
    }
    else
    {
        playsound(userChosenColour);
        animationPress(userChosenColour);
        if(gamePattern.length===userClickedPattern.length)
    {

        while(userClickedPattern.length!==0)
        {
            userClickedPattern.pop();
        }
        setTimeout(function()
        {
            nextSequence();
        },1000);
        
    }
    }
    }
});
$(document).keypress(function()
{
    if(count===0)
    {
        nextSequence();
    }

})